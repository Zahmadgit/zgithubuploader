/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './Components/App.jsx';

console.log(
  '👋 This message is being logged by "renderer.js", included via webpack'
);
import asset from '../static/assets/degenerateshit.png';

window.addEventListener('DOMContentLoaded', () => {
  // Mount React
  const rootContainer = document.getElementById('root');
  if (rootContainer) {
    const root = createRoot(rootContainer);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }

  // Existing DOM logic
  const img = document.getElementById('pressableImg');
  if (img) {
    img.src = asset;
    img.style.cursor = 'pointer';
    img.onclick = () => {
      console.log('Image clicked!');
    };
  }

  console.log(window.myAPI);
  console.log(window.myAPI2.doAThing());

  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', async () => {
      const title = document.getElementById('titleInput').value.trim();
      const note = document.getElementById('noteInput').value;
      const result = await window.githubAPI.uploadNote({
        owner: 'Zahmadgit',
        repo: 'notes',
        title,
        note,
      });

      if (result.success) {
        alert('Note uploaded successfully yayyy');
      } else {
        alert('fuck: ' + result.error);
      }
    });
  }

  // Note: Avoid using React hooks outside React components here
});
