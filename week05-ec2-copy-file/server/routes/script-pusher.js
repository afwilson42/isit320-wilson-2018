var express = require('express');
var router = express.Router();

const spawn = require('child_process').spawn;

let allData = "";

const copyFile = () => {

    return new Promise(function (resolve, reject) {

        console.log("Copy to EC2", process.env.SETUP_LINUXBOX);

        const pushScript = spawn('scp', [process.env.SETUP_LINUXBOX + '/CpuInfo', 'ec2-bc:/home/ubuntu']);

        pushScript.stdout.on('data', (data) => {
            console.log(`child stdout:\n${data}`);
            allData += 'PUSH-SCRIPT: ' + data;
            //console.log('PUSH', data);
        });

        pushScript.stderr.on('data', (data) => {
            console.log(`child stderr:\n${data}`);
            allData += 'PUSH-SCRIPT: ' + data;
            //console.error('PUSH', data);
        });

        pushScript.on('close', (code) => {
            resolve({
                result: 'success',
                code: code
            });
        });

        pushScript.on('error', (code) => {
            reject({
                result: 'error',
                code: code
            });
        });
    });
};

router.get('/copy-file', function (request, response, next) {
    'use strict';
    //res.send({ result: 'successful', objName: 'script-pusher'});

    copyFile()
        .then((result) => {
            console.log(JSON.stringify(result, null, 4));
            response.send(result);
        })
        .catch((err) => {
            console.log(err);
            response.send(err);
        })
});


module.exports = router;