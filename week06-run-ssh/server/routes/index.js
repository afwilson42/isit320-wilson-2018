var express = require('express');
var router = express.Router();
const Client = require('ssh2').Client;

const hostAddress = '35.175.11.116';

let allData = '';

const runCpuInfo = (hostAddress, response) => {
    var conn = new Client();
    conn.on('ready', function() {
        console.log('Client :: ready');
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
        host: hostAddress,
        port: 22,
        username: 'ubuntu',
        privateKey: require('fs').readFileSync(
            process.env.HOME + '/.ssh/ec2-isit320-wilson.pem'
        )
    });
};

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
    res.render('index', { title: 'server' });
});

router.get('/call-cpu-info', (request, response) => {
    runCpuInfo(hostAddress, response);
});

module.exports = router;
