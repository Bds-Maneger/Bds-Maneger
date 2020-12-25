#!/usr/bin/env node
var fs = require("fs");
const electron = require('electron')
const path = require('path')
const { app, BrowserWindow } = require('electron')
if (fs.existsSync('./config.json')) {
  var config_load = JSON.parse(fs.readFileSync('./config.json', "utf-8")).default_pages;
} else {
var default_config = `{\n    \"default_pages\": \"default\",\n    \"config\": {\n        \"Still setting up the settings\": false\n    }\n}`
  fs.writeFileSync('./config.json', default_config);
  var config_load = JSON.parse(default_config).default_pages;
};
if (config_load == 'default'){
  let JSONC = JSON.parse(fs.readFileSync(`bds_pages/default/config.json`)).index
  var load_pages = path.join(process.cwd(), 'bds_pages', 'default', JSONC)
} else {
  var JSONC = JSON.parse(fs.readFileSync(`bds_pages/custom_pages/${config_load}/config.json`)).index
  var load_pages = path.join(process.cwd(), 'bds_pages', 'custom_pages', config_load, JSONC)
}
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
function createWindow () {
  const win = new BrowserWindow({
    minWidth: 640,
    minHeight: 640,
    icon: path.join(process.cwd(), "bds_pages", "assents", "mcpe.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
      sandbox: false,
      experimentalFeatures: true,
      preload: path.join(process.cwd(), 'preload.js')
    }
  });
  win.loadFile(load_pages);
  win.maximize();
}
if (process.platform == 'darwin'){
  console.log('Mac OS system Not supported, consulter https://github.com/Sirherobrine23/Bds_Maneger/wiki/systems-support#a-message-for-mac-os-users')
  require('electron').shell.openExternal("https://github.com/Sirherobrine23/Bds_Maneger/wiki/systems-support#a-message-for-mac-os-users")
  app.quit()
}
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
  console.log(`Deteting bds Server is reuning`)
  var detect = require('bds_maneger_api').detect()
  if (detect){
    require('bds_maneger_api').kill();
    console.log(`Miles \"Tails\" Prower found Sonic`);
  } else
    console.log('Sonic The Hedgehog is not running')
  console.log('Going out ...')
  app.quit()
})
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});