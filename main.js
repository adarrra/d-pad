const {app, BrowserWindow, Menu, MenuItem, Tray} = require('electron');

const path = require('path');
const url = require('url');

let tray = null;
var mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Distraction pad',
        backgroundColor: '#f6f175'
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.on('close',function (e) {
        e.preventDefault();
        this.hide();
    });
}

let template = [
    {
        label: 'Show pad',
        click: function () {
            if (mainWindow.isMinimized()) {
                mainWindow.maximize();
            } else {
                mainWindow.show();
            }
            mainWindow.focus();

        }
    },
    {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {
            mainWindow.close();
        }
    },
];


app.on('ready', () => {
    console.log('ready');
    tray = new Tray('./note.png');

    mainWindow = createWindow();
    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Put your distractions here...');

//     contents.executeJavaScript("window.addEventListener('contextmenu', function(e){console.log('CONTEXT');}'", true)
//     .then((result) => {
//     console.log(result) // Will be the JSON object from the fetch call
// });


});

/*
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600})

  // and load the index.html of the app.
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
*/
