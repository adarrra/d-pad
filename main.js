const {app, BrowserWindow, Menu, Tray} = require('electron');

const path = require('path');
const url = require('url');

let tray = null;
let mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 400,
        height: 200,
        title: 'Distraction pad',
    });


    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // for debug: 
    // mainWindow.webContents.openDevTools();

    mainWindow.on('close',function (e) {

        e.preventDefault();
        this.hide();
    });
}

let template = [
    {
        label: 'Show pad',
        click: function () {
            mainWindow.show();
            mainWindow.focus();

        }
    },
    {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: function () {
            app.exit();
        }
    },
];


app.on('ready', () => {
    console.log('ready');
    tray = new Tray('./note.png');

    createWindow();
    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Put your distractions here...');
});


