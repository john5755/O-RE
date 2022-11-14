import { app, ipcMain, Tray, Menu, ipcRenderer, BrowserWindow } from "electron";
import serve from "electron-serve";
import { createWindow } from "./helpers";

let tray;
//트레이 아이콘
let mainWindow: BrowserWindow;
function initTrayIconMenu() {
  tray = new Tray("public/icons/AppIcon.ico");
  const myMenu = Menu.buildFromTemplate([
    { label: "O:RE", type: "normal" },
    {
      label: "open",
      type: "normal",
      click: () => {
        mainWindow.show();
      },
    },
    {
      label: "close",
      type: "normal",
      click: () => {
        mainWindow.close();
      },
    },
  ]);
  tray.setToolTip("O:RE");
  tray.setContextMenu(myMenu);
}

const isProd: boolean = process.env.NODE_ENV === "production";

if (isProd) {
  serve({ directory: "app" });
} else {
  app.setPath("userData", `${app.getPath("userData")} (development)`);
}

(async () => {
  await app.whenReady();

  mainWindow = createWindow("main", {
    width: 1000,
    height: 600,
  });
  initTrayIconMenu();

  if (isProd) {
    await mainWindow.loadURL("app://./home.html");
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/`);
    mainWindow.webContents.openDevTools();
  }
  ipcMain.on("closeApp", () => {
    mainWindow.hide();
  });
  ipcMain.on("window-toggle-maximize", () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on("window-minimize", () => {
    mainWindow.minimize();
  });
})();
