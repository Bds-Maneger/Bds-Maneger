// Core Script
// This is the script that manages and sends commands to the server (This is the script that manages and sends commands to the server (a bridge as we can call).
// it will serve to communicate to and start the server. and it is a mandatory item for bds_maneger to work.
function LogOut(dados){
    var GetDivorTextarea = document.getElementById('LOG').tagName
    if (GetDivorTextarea == "TEXTAREA"){
        document.getElementById('LOG').value += `${dados}`
    } else {
        var scripts = document.createElement("p");
        scripts.innerHTML = dados;
        document.getElementById('LOG').appendChild(scripts);
    };
};
function startServer() {
    if (localStorage.getItem('bds_status') == 'started'){
        LogOut('Your Server has already started');
    } else {
        localStorage.setItem('bds_status', 'started');
        var inject = document.createElement("iframe");inject.id = 'serveinjectstart';inject.style.display = 'none';document.body.appendChild(inject); 
        var scripts = document.createElement("script");scripts.src = `${process.cwd()}/bds_pages/assents/js/start.js`;scripts.id = 'ServerStarted';document.getElementById('serveinjectstart').appendChild(scripts);
    };
};
function stopserver(){
    if (localStorage.getItem('bds_status') == 'stoped'){
        LogOut('Your server is already stopped');
    } else {
        serverstated.stdin.write(`say voce\n`);
        for (let index = 1; index < 12; index++) {
            setTimeout(function timer() {
                if (index == '11'){
                    serverstated.stdin.write('stop\n');
                    localStorage.setItem('bds_status', 'stoped');
                } else {
                    serverstated.stdin.write(`say Server is stop in ${index}s\n`);
                    console.log(`Server is stop in ${index}s`);
                    LogOut(`Server is stop in ${index}s\n`);
                };
            }, index * 1000);
        };
    };
};
function restartServer(){
    if (localStorage.getItem('bds_status') == 'started'){
        stopserver();
        startServer();
    } else {
        startServer();
    };    
}
function worldbackup(){
    var status = localStorage.getItem('bds_status');
    if (status == 'started'){
        stopserver();
    }
    if (status == 'stoped'){
        var today = new Date();var dd = String(today.getDate()).padStart(2, '0');var mm = String(today.getMonth() + 1).padStart(2, '0');var yyyy = today.getFullYear();var hour = today.getHours();var minu = today.getMinutes()
        today = `${yyyy}_${mm}-${dd}@@${minu}-${hour}`;
        var exec = require('child_process').exec;
        if (process.platform == 'win32'){
            var serverstated = exec(`cd ${process.env.HOME}/bds_Server/worlds/ && tar.exe -czf %USERPROFILE%/Desktop/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in desktop'
        } else if (process.platform == 'linux'){
            var serverstated = exec(`cd ${process.env.HOME}/bds_Server/worlds/ && tar -czf ~/bds_backup_World_${today}.tar.gz *`, {detached: false,shell: true});
            var mensagemBackup = 'You backup is in home dir'
        }        
        serverstated.on('exit', function (code) {
            if (code == 0){
                alert(`${mensagemBackup}, with name: bds_backup_World_${today}.tar.gz`);
            } else {
                alert('erro to create backup');
            }
        });
    } else {
        if (confirm('Voçê quer tentar de novo')){
            worldbackup();
        }
    }
};




function sendcomand() {
    document.getElementById('comsen').setAttribute('disabled','')
    var blank = '';
    var command = document.getElementById('cmds').value
    if (command == 'stop'){
        alert('Use Stop in options');
        var command = document.getElementById('cmds').value
    } else {
        if (command == blank) {
            document.getElementById('comsen').removeAttribute('disabled')
            alert('command is blank')
        } else {
            document.getElementById('comsen').removeAttribute('disabled')
            document.getElementById('cmds').value = ''
            serverstated.stdin.write(command+'\n');
        };
    };
};
function sendco(ele) {
    if(event.keyCode == 13) {
        document.getElementById("comsen").click();
    }
};