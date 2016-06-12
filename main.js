const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 1024, height: 768})
  mainWindow.loadURL(`file://${__dirname}/app/index.html`)
  // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', function () {
	mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
	app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
	createWindow()
  }
})

let devTools = false

electron.ipcMain.on('invokeAction', function(event, keyCode){
	if(keyCode!=68)
		return;

	devTools =! devTools

	if(devTools){
		mainWindow.webContents.openDevTools()
	}else{
		mainWindow.webContents.closeDevTools()
	}
});
