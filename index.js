const { app, BrowserWindow, globalShortcut } = require('electron');

let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        kiosk: true, // This ensures the app runs in full-screen kiosk mode
        autoHideMenuBar: true, // This hides the menu bar by default
        alwaysOnTop: true
    });

    // Load the index.html of the app.
    mainWindow.loadFile('index.html');

    // Register global shortcut for the Escape key to quit the app
    globalShortcut.register('Escape', () => {
        app.quit();
    });

    // Prevent the window from being closed
    mainWindow.on('close', (e) => {
        e.preventDefault();
    });

    // Open the DevTools (optional).
    mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    // Block some key combinations
    globalShortcut.register('CommandOrControl+R', () => {}); // Block Ctrl+R
    globalShortcut.register('CommandOrControl+Shift+R', () => {}); // Block Ctrl+Shift+R
    globalShortcut.register('Alt+Tab', () => {}); // Block Alt+Tab
    globalShortcut.register('CommandOrControl+Alt+Tab', () => {}); // Block Ctrl+Alt+Tab
    globalShortcut.register('CommandOrControl+Shift+Tab', () => {}); // Block Ctrl+Shift+Tab
    globalShortcut.register('CommandOrControl+W', () => {}); // Block Ctrl+W
    globalShortcut.register('CommandOrControl+M', () => {}); // Block Ctrl+M
    globalShortcut.register('Alt+F4', () => {}); // Block Alt+F4
    
    // ... add more shortcuts as needed
});


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }

    
});

// Unregister all global shortcuts when the app is about to quit
app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});
