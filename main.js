const {app, BrowserWindow, Menu, Tray} = require('electron');
const platform = require('os').platform();
const path = require('path');
const url = require('url');

let mainWindow = null;
let forceQuit = false;

app.on('ready', () => {
    // console.log('ready');
    const tray = new Tray(getTrayIcon());

    createWindow();
    const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
    tray.setContextMenu(contextMenu);
    tray.setToolTip('Put your distractions here...');
    if (platform === 'darwin') {
        setupMacExtras();
    }
});

function getTrayIcon() {
    if (platform === 'darwin') {
        return path.join(__dirname, '/icons/macos/menubar.png');
    } else if (platform === 'win32') {
        return path.join(__dirname, '/icons/windows/128x128.ico');
    } else if (platform === 'linux') {
        return path.join(__dirname, '/icons/32x32.png');
    }
}

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 400,
        height: 200,
        icon: path.join(__dirname, '/icons/128x128.png'),
        title: 'd-pad',
        backgroundColor: '#f6f175', // for loading screen
    });


    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // for debug:
    // mainWindow.webContents.openDevTools();

    mainWindow.on('close',function (e) {
        // forceQuit is trick for Mac http://stackoverflow.com/questions/35008347/electron-close-w-x-vs-right-click-dock-and-quit
        if(!forceQuit) {
            e.preventDefault();
            this.hide();
        }

    });
}

function setupMacExtras() {
    // show pad on click on dock icon
    app.on('activate', () => {
        mainWindow.show();
    });
    
    // enable copy/paste with cmnd
    Menu.setApplicationMenu(Menu.buildFromTemplate(macMenuTemplate));
    
    app.on('before-quit', function() {
        forceQuit = true;
    });
}

let trayMenuTemplate = [
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

const macMenuTemplate = [{
    label: "Application",
    submenu: [
        { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
        { type: "separator" },
        { label: "Quit", accelerator: "Command+Q", click: function() { app.quit(); }}
    ]}, {
    label: "Edit",
    submenu: [
        { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
        { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
        { type: "separator" },
        { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
        { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
        { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
        { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
    ]}
];
