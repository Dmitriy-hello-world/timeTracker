const fs = require("fs").promises;
const path = require("node:path");
const isDev = require("electron-is-dev");
const electron = require("electron");

const {
  app,
  globalShortcut,
  BrowserWindow,
  ipcMain,
  Menu,
  Tray,
  IpcMainEvent,
} = electron;

const DEFAULT_WIDTH: number = 1024;
const DEFAULT_HEIGHT: number = 726;

app.whenReady().then(async () => {
  const window = new BrowserWindow({
    frame: false,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.on(
    "hotKey",
    (_: typeof IpcMainEvent, { message }: { message: string }) => {
      console.log(message);
      globalShortcut.unregisterAll();

      globalShortcut.register(message, () => {
        window.webContents.send("press-btn", { message });
        window.webContents.send("timer-start", "");
        window.show();
      });
    }
  );

  ipcMain.on("closeApp", () => window.close());
  ipcMain.on("minimizeApp", () => window.minimize());
  ipcMain.on("maximizeWindow", () => window.maximize());
  ipcMain.on("restoreWindow", () => window.restore());

  window.on("show", () => window.focus());
  window.on("maximize", () => window.webContents.send("maximize", ""));
  window.on("unmaximize", () => window.webContents.send("unmaximize", ""));

  if (isDev) {
    window.loadURL(`http://localhost:${process.env.PORT || 8080}`);
    window.webContents.openDevTools();
  } else {
    window.removeMenu();
    window.loadFile(path.join(__dirname, "index.html"));
  }
});
