- electron api demos http://electron.atom.io/
- check https://www.youtube.com/watch?v=QkfXZ2IFIck, https://atomio.slack.com/messages/electron/    
- docs http://electron.atom.io/docs/api/tray/ , https://electron.atom.io/docs/api/browser-window/
- how to debug
- how to control it style? (icon from http://www.flaticon.com/free-icon/check-mark_304437#term=notepad&page;=1&position;=51)
- ? some hot reload?
- BAD NEWS about ubuntu limitations: click event, tooltip... https://github.com/electron/electron/issues/6773 , https://unity.ubuntu.com/projects/appindicators/б https://bugs.launchpad.net/ubuntu/+source/libappindicator/+bug/522152


idea: create invisible browser window. listen renderer process window. like
window.addEventListener('contextmenu', (e) => {
e.preventDefault()
menu.popup(remote.getCurrentWindow())
})
or we can access it?

- How can I get tray position... arrrrrrrrrrr It seems electron not SO sweet for ubuntu...

when context open - make browser window visible...

"**main process**  manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app"
"but you can also use it in the render process via the remote module. https://electron.atom.io/docs/api/remote/"
For the reverse (access the renderer process from the main process), you can use webContents.executeJavascript.

Someday:
- electron-awesome
