// This script, manage the versions of Minecraft Bedrock Server, this file has not yet been included in core_service.js
// Download BDS Software
// Id selecttion: bds-Server_download
fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/dev/Server.json').then(response => response.text()).then(langArray => {
    var newSelect = document.getElementById('bds-Server_download')
        for(index in JSON.parse(langArray).Versions){
            var opt = document.createElement("option");
            opt.value= index;
            opt.innerHTML = JSON.parse(langArray).Versions[index];
            // Taca tudo do select
            newSelect.appendChild(opt);
            index++;
        }
    }
);

function logD(vales){
    var logDownload = document.createElement("p");
    logDownload.innerHTML = vales;
    document.getElementById('BDSLOGDOWNLOAD').appendChild(logDownload);
}

function DownloadBDS(){
    logD("Iniciando o download");
    var jsonNumber = document.getElementById('bds-Server_download').value
    fetch('https://raw.githubusercontent.com/Sirherobrine23/Bds_Maneger-for-Windows/dev/Server.json').then(response => response.text()).then(langArray => {
        var Vdown = JSON.parse(langArray).Versions[jsonNumber]
        localStorage.setItem('bds_server_version', Vdown)
        if (process.platform == 'win32'){
            var URLd = `https://minecraft.azureedge.net/bin-win/bedrock-server-${Vdown}.zip`;
        } else if (process.platform == 'linux'){
            var URLd = `https://minecraft.azureedge.net/bin-linux/bedrock-server-${Vdown}.zip`;
        }
        console.log(URLd, NAMEd)
        var NAMEd = 'bedrock-server-' + Vdown + '.zip'
        // 
        var exec = require('child_process').exec;
        if (process.platform == 'win32'){
          var downloadBDSchild = exec(`cd %TMP% && curl ${URLd} --output ${NAMEd}`);
        } else if (process.platform == 'linux'){
          var downloadBDSchild = exec(`cd /tmp && curl ${URLd} --output ${NAMEd}`);
        }
        downloadBDSchild.stdout.on('data', function (data) {
            logD(data)
        });
        downloadBDSchild.on('exit', function (code) {
            if (code == 0){
                logD('download Sucess');
                if (process.platform == 'win32'){
                    var ZIP_FILE_PATH = `${process.env.TMP}/${NAMEd}`;
                    var ZIP_FILE_OUTPUT = `${process.env.USERPROFILE}/bds_Server`;
                } else if (process.platform = 'linux'){
                    var ZIP_FILE_PATH = `/tmp/${NAMEd}`;
                    var ZIP_FILE_OUTPUT = `${process.env.HOME}/bds_Server`;
                }
                // Unzip
                logD('init extract');
                var AdmZip = require('adm-zip');
                var zip = new AdmZip(ZIP_FILE_PATH);
                var zipEntries = zip.getEntries();
                zipEntries.forEach(function(zipEntry) {
                    console.log(zipEntry.entryName.toString());
                });
                zip.extractAllTo(ZIP_FILE_OUTPUT, true);
                // End Unzip
            }
        });
    });
};