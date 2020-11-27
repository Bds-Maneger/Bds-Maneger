const cron = require("node-cron");

function backupS1(){
    if (document.getElementById('backupCh').checked){
        var bds_status_cron  = localStorage.getItem('bds_status');if (bds_status_cron == 'started'){console.log('Stoping server');stopserver();console.log('Stop sucess')}
        if (bds_status_cron  == 'stoped'){
            var today = new Date();var dd = String(today.getDate()).padStart(2, '0');var mm = String(today.getMonth() + 1).padStart(2, '0');var yyyy = today.getFullYear();var hour = today.getHours();var minu = today.getMinutes();today = `${yyyy}_${mm}-${dd}@@${minu}-${hour}`;
            var exec = require('child_process').exec;
            if (process.platform == 'win32'){
                var backupSChild = exec(`cd ${process.env.HOME}/bds_Server/worlds/ && tar.exe -czf %USERPROFILE%/Desktop/bds_backup_World_${today}.tar.gz *`);
                var mensagemBackup = 'You backup is in desktop'
            } else if (process.platform == 'linux'){
                var backupSChild = exec(`cd ${process.env.HOME}/bds_Server/worlds/ && tar -czf ~/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
                var mensagemBackup = 'You backup is in home dir'
            }
            backupSChild.stdout.on('data', function (data){
                console.log(data)
            })
            backupSChild.on('exit', function (code) {
                if (code == 0){
                    console.log(`${mensagemBackup} with name: bds_backup_World_${today}.tar.gz`);
                } else {
                    console.log('erro to create backup');
                };
            });
        };    
    } else {
        console.log('Is not checked')
    }
    
}
function startBackup(){
    cron.schedule("* 23 * * *", () => backupS1());
}
// function setTimas(){var segunds = document.getElementById("se").value;var minuts = document.getElementById("mi").value;var hours = document.getElementById("ho").value;localStorage.setItem('segunds', segunds);localStorage.setItem('minuts', minuts);localStorage.setItem('hours', hours);localStorage.setItem('segunds', segunds);localStorage.setItem('minuts', minuts);localStorage.setItem('hours', hours);alert('Sucess set time')};

// document.getElementById("se").value = localStorage.getItem('segunds');document.getElementById("mi").value = localStorage.getItem('minuts');document.getElementById("ho").value = localStorage.getItem('hours');