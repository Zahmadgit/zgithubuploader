// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('myAPI', {
  desktop: true,
});
console.log('Hellow bitch');
// preload with contextIsolation disabled
contextBridge.exposeInMainWorld('myAPI2', {
  doAThing: () => {
    console.log('bigGay');
  },
});

contextBridge.exposeInMainWorld('githubAPI', {
  uploadNote: (data) => ipcRenderer.invoke('upload-note', data),
});

contextBridge.exposeInMainWorld('productAPI', {
  getProducts: () => ipcRenderer.invoke('get-products'),
});

contextBridge.exposeInMainWorld('getRepoPath', {
  getRepoPath: () => ipcRenderer.invoke('getRepoPath'),
});
