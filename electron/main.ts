const fs = require("fs").promises;
const path = require("node:path");
const isDev = require("electron-is-dev");
const electron = require("electron");
const storage = require("electron-json-storage");

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
    minWidth: DEFAULT_WIDTH,
    minHeight: DEFAULT_HEIGHT,
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
  window.on("close", () => window.webContents.send("willClose", ""));

  ipcMain.on("getTime", () => {
    storage.get("savedTime", function (error: Error, data: string) {
      if (error instanceof Error) throw error;
      console.log("Data read from electron-json-storage:", data);
      window.webContents.send("afterGet", { data });
    });
  });

  ipcMain.on("setTime", (_: typeof IpcMainEvent, data: string) => {
    storage.set("savedTime", { value: data }, function (error: Error) {
      console.log(data);
      if (error instanceof Error) throw error;
    });
  });

  if (isDev) {
    window.loadURL(`http://localhost:${process.env.PORT || 8080}`);
    window.webContents.openDevTools();
  } else {
    window.removeMenu();
    window.loadFile(path.join(__dirname, "index.html"));
  }
});
