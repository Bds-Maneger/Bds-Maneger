// start server (Inject in iframe)
// Very important file to start the server in NodeJs and leave it in the background.

console.log('Getting Started');
var exec = require('child_process').exec;
if (process.platform == 'win32'){
    var bdsDIRpathexe = `cd ${process.env.HOME}/bds_Server/ && bedrock_server.exe`;
} else if (process.platform == 'linux'){
    var bdsDIRpathexe = `cd ${process.env.HOME}/bds_Server/ && chmod 777 bedrock_server && LD_LIBRARY_PATH=${process.env.HOME}/bds_Server/.  ${process.env.HOME}/bds_Server/bedrock_server`
}
var serverstated = exec(bdsDIRpathexe, {detached: false});
serverstated.stdout.on('data', function (data) {LogOut(data)});
