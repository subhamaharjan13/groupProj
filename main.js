const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const {enable, destory} = require('splash-screen');

let win;

function createWindow(){
  win = new BrowserWindow({width:800, height:600, icon:__dirname+'/img/spine.jpg'});

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  //open devtools
win.webContents.openDevTools();

win.on('closed', () => {
  win = null;
});

// win.loadURL('img/spinegiphy');
}

//run create window function
app.on('ready', createWindow);

// enable('tailing');
// destory();


//quit when all windows are closed
app.on('window-all-closed', () => {
  if(process.platform !== 'win32'){
    app.quit();
  }
});
