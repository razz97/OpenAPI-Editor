const { app, BrowserWindow, Menu, screen } = require('electron')

let win;
Menu.setApplicationMenu(null);

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  // Create the browser window.
  win = new BrowserWindow({
    width: width / 2,
    height: height / 2,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/dist/assets/logo.png`,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // Allow user to resize window
  win.resizable = true;

  // Open the DevTools.
  win.webContents.openDevTools();

  // Load angular
  win.loadURL(`file://${__dirname}/dist/openapi-generator/index.html`)

  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron intialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})