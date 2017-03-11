const {app, BrowserWindow, Menu, Tray} = require('electron');
const platform = require('os').platform();  
const path = require('path');
const url = require('url');

let mainWindow = null;

app.on('ready', () => {
    // console.log('ready');
    const tray = new Tray(getTrayIcon());

    createWindow();
    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Put your distractions here...');
});

function getTrayIcon() {
    if (platform == 'darwin') {  
        return path.join(__dirname, '/icons/macos/menubar.png');
    }
    else if (platform == 'win32') {  
        return path.join(__dirname, '/icons/windows/128x128.ico');
    }
    else if (platform == 'linux') {
        return path.join(__dirname, '/icons/32x32.png');
    }
}

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 400,
        height: 200,
        icon: path.join(__dirname, '/icons/128x128.png'),
        title: 'd-pad',
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


