const electron = require("electron")
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu, ipcMain } = electron

let mainWindow

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    })
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true
        })
    )
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    ipcMain.on("key:inputValue", (err, data) => {
        console.log(data)
    })
})

const mainMenuTemplate = [
    {
        label: "Electron Starter",
        submenu: [
            {
                label: "Electron"
            },
            {
                label: "Starter"
            },
            {
                label: "Quit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                role: "quit"
            }
        ]
    },
]


if(process.platform == "darwin"){
    mainMenuTemplate.unshift({
        label: app.getName(),
    })
}

if(process.env.NODE_ENV !== "production"){
    mainMenuTemplate.push({
        label: "Dev Tools",
        submenu: [
            {
                label: "Open Dev Tools",
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools()
                },
                accelerator: process.platform == "darwin" ? "Command+Shift+C" : "Ctrl+Shift+C",
            },
            {
                label: "Reload",
                role: "reload"
            }
        ]
    })
}