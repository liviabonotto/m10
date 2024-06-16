/* eslint-disable @typescript-eslint/explicit-function-return-type */
const { app, BrowserWindow } = require("electron");
const path = require("path");

const createWindow = () => {
  win = new BrowserWindow({ show: false });
  win.maximize();
  win.show();
  win.setMenu(null);
  win.loadFile("./dist/index.html");
};

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
