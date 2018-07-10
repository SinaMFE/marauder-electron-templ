// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const {shell} = require('electron');
document.getElementById("door").onclick=function(){
    shell.openExternal("http://172.16.193.195:1337/");
}