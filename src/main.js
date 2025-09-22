const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const { Octokit } = require('@octokit/rest');
const { error } = require('node:console');
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

function getOctokit() {
  const GITHUB_TOKEN_NOTES = process.env.GITHUB_TOKEN_NOTES;
  if (!GITHUB_TOKEN_NOTES) {
    throw new Error('Github token is fucking broken');
  }
  return new Octokit({ auth: GITHUB_TOKEN_NOTES });
}

ipcMain.handle(
  'upload-note',
  async (event, { owner, repo, path, note, branch }) => {
    try {
      const octokit = getOctokit();
      const contentBase64 = Buffer.from(note).toString('base64');
      if (!path || typeof path !== 'string' || path.endsWith('/')) {
        throw new Error(
          "Invalid path. Provide a file path like 'notes/myNote.md' (not a directory)."
        );
      }

      // Resolve target branch (handle main vs master or custom default branches)
      let targetBranch = branch;
      if (!targetBranch) {
        try {
          const { data: repoInfo } = await octokit.repos.get({ owner, repo });
          targetBranch = repoInfo?.default_branch || 'main';
        } catch (getErr) {
          const status = getErr?.status || getErr?.response?.status;
          const apiMessage = getErr?.response?.data?.message;
          const detailed = apiMessage
            ? `${status || ''} ${apiMessage}`.trim()
            : getErr.message;
          throw new Error(
            `Cannot access repo '${owner}/${repo}'. ${detailed}. ` +
              'Ensure the token has access and the repo exists.'
          );
        }
      }

      // so if the file already exists, we gotta include its current SHA to update it
      let currentSha = undefined;
      try {
        const { data: existing } = await octokit.repos.getContent({
          owner,
          repo,
          path,
          ref: targetBranch,
        });
        if (existing && typeof existing === 'object' && 'sha' in existing) {
          currentSha = existing.sha;
        }
      } catch (getContentErr) {
        // 404 = file nono exist; so make a new sha to create it
        const status = getContentErr?.status || getContentErr?.response?.status;
        if (status && status !== 404) {
          throw getContentErr;
        }
      }

      const response = await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: 'Add/Update note',
        content: contentBase64,
        branch: targetBranch,
        sha: currentSha,
      });
      return { success: true, data: response.data };
    } catch (e) {
      const status = e?.status || e?.response?.status;
      const apiMessage = e?.response?.data?.message;
      const detailed = apiMessage
        ? `${status || ''} ${apiMessage}`.trim()
        : e.message;
      console.error('GitHub API error:', {
        status,
        message: e.message,
        apiMessage,
        owner,
        repo,
        path,
      });
      return { success: false, error: detailed };
    }
  }
);

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
