import { Tray, Menu, nativeImage, BrowserWindow } from "electron";
import util from "../util";

const init = (mainWindow: BrowserWindow) => {
  const icon = nativeImage.createFromPath(util.getAsset("AppIcon.ico"));
  const tray = new Tray(icon);
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
};

export default {
  init,
};
