var request = require('request');
var fs = require("fs");
var unzip = require("unzip");
var sina__electron="http://mjs.sinaimg.cn/wap/zip/config_simulate/sina_electron.json?"+new Date().getTime();

function autoUpdate4hot(){
    var package = require("./package.json");
    //判断是否需要升级
// check 
request(sina__electron,function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var json =JSON.parse(body);
        var newVersion = "";
        var zipUrl = "";
        if(json.data&&json.data.modules&&json.data.modules){
            var modules =json.data.modules;
            for(var i =0 ;i<modules.length;i++){
                if(modules[i].name=="electron-village-client/index"){
                    newVersion=modules[i].version;
                    zipUrl=modules[i].pkg_url+"?v=5";
                }
            }
        }
        if( package.version!=newVersion&&newVersion!=""){
            downloadFile(zipUrl,"./"+newVersion+".zip",function(data){
                fs.createReadStream('./'+newVersion+'.zip').pipe(unzip.Extract({ path: './'+newVersion }));
                //check 包是否完整
                if(fs.existsSync('./'+newVersion+"/index.html")){
                    package.version = newVersion;
                    fs.writeFileSync("./package.json", JSON.stringify(package));
                }
            })
        }
    }
  })
}

function downloadFile(uri,filename,callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback); 
}

module.exports =autoUpdate4hot;