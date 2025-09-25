import getOctokit from './getOctoKit';

const notesUploadHandler = async (
  event,
  { owner, repo, title, note, branch }
) => {
  try {
    const octokit = getOctokit();
    const contentBase64 = Buffer.from(note).toString('base64');
    const rawTitle = (title || 'untitled').toString();
    const slug =
      rawTitle
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '') || 'untitled';

    // need to handle the branch naming conventions
    let targetBranch = branch;
    if (!targetBranch) {
      try {
        const { data: repoInfo } = await octokit.repos.get({ owner, repo });
        targetBranch = repoInfo?.default_branch || 'main';
        console.log(repoInfo);
      } catch (getErr) {
        const status = getErr?.status || getErr?.response?.status;
        const apiMessage = getErr?.response?.data?.message;
        const detailed = apiMessage
          ? `${status || ''} ${apiMessage}`.trim()
          : getErr.message;
        throw new Error(
          `Cannot access repo fix this shit: '${owner}/${repo}'. ${detailed}. ` +
            'The token might not have access or the repo doesnt exist.'
        );
      }
    }

    // so I actually need a unique path and to get that I can Find a unique path under notes/ by incrementing -1, -2, ... if needed
    let candidatePath = `notes/${slug}.md`;
    let suffix = 1;
    while (true) {
      try {
        await octokit.repos.getContent({
          owner,
          repo,
          path: candidatePath,
          ref: targetBranch,
        });
        // for now im checking to see if it exist and then incrementing the suffix
        candidatePath = `notes/${slug}-${suffix}.md`;
        suffix += 1;
      } catch (checkErr) {
        const status = checkErr?.status || checkErr?.response?.status;
        if (status === 404) break; // does not exist, we can create it
        throw checkErr; // other errors bubble up
      }
    }

    const response = await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path: candidatePath,
      message: 'Add/Update note',
      content: contentBase64,
      branch: targetBranch,
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
};

export default notesUploadHandler;
