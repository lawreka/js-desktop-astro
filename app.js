const { app, BrowserWindow } = require('electron')

function createWindow() {
    const appWindow = new BrowserWindow({
        width: 1000,
        height: 800
    })

    appWindow.loadFile('dist/js-desktop-astro/browser/index.html')
    appWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
    createWindow()
})
