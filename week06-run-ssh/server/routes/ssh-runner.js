var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;
const elfUtils = require('elven-code').elfUtils;

let allData = '';

const runCpuInfo = (ssHip,ssHidentity, response) => {
    var conn = new Client();
    console.log('Client :: ready', ssHip, ssHidentity);
    conn.on('ready', function() {
        conn.exec('~/CpuInfo', function(err, stream) {
            if (err) throw err;
            stream
                .on('close', function(code, signal) {
                    console.log(
                        'Stream :: close :: code: ' +
                        code +
                        ', signal: ' +
                        signal
                    );
                    conn.end();
                    response.send({ result: 'success', allData: allData });
                })
                .on('data', function(data) {
                    console.log('STDOUT: ' + data);
                    allData += data;
                })
                .stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                    allData += data;
                });
        });
    }).connect({
        host: ssHip,
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(
            process.env.HOME + '/.ssh/' + ssHidentity
        )
    });


};

const getSshIp = () => {
    return new Promise(function (resolve, reject) {
        elfUtils.readFile(process.env.HOME + '/.ssh/config')
            .then((content) => {
                //var pattern = new RegExp('Host ec2-bc[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)[\\s\\S]\\s*(.*)');
                var pattern = new RegExp('Host ec2-bc\n\t(.*)\n\t(.*)\n\t(.*)\n\t(.*)');
                const result = {};
                const match = content.result.match(pattern);
                for (let i = 1; i < 5; i++) {
                    if (match[i].startsWith('HostName')) {
                        var hostPattern = new RegExp('HostName\\s(.*)');
                        result.hostName = match[i].match(hostPattern)[1];
                    }
                    if (match[i].startsWith('IdentityFile')) {
                        const idPattern = new RegExp('IdentityFile\\s(.*)');
                        const path = match[i].match(idPattern)[1];
                        result.identityFile = path.substring(path.lastIndexOf('/') + 1, path.length)
                    }
                }
                resolve(result);
            })
            .catch(reject);
    });
};

/*router.get('/call-cpu-info', (request, response) => {
    runCpuInfo(hostAddress, response);
}); */

router.get('/call-cpu-info', function(request, response) {
    console.log('runCpuInfo called in ssh-runner');
    getSshIp()
        .then((result) => {
            console.log(result);
            runCpuInfo(result.hostName, result.identityFile, response);
        })
        .catch((err) => {
            response.send(err);
        });

});



module.exports = router;