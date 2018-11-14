const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const Notification = require('electron-native-notification');


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
}

//run create window function
app.on('ready', createWindow);

//quit when all windows are closed
app.on('window-all-closed', () => {
  if(process.platform !== 'win32'){
    app.quit();
  }
});


//for Notifications

app.on('ready', () => {

  const opt = { body: 'See? Really easy to use!' };

  const notification = new Notification('I am a notification!', opt);

  notification.on('show', () => {
    console.log('I\'m coming~');
  });

  notification.onclick = () => {
    console.log('On no! You touch me. It\'s hurt!!');
  };

  notification.addEventListener('close', () => {
    console.log('I\'ll be back!!');
  });

  notification.addListener('error', (err) => {
    console.error(err);
  });

  console.log('What does the notification say? ' + notification.body);

  setTimeout(() => notification.close(), 2000);

});
