'use strict';

const AWS = require('aws-sdk');
const qs = require('querystring');

let token = 'add-your-slack-token-here';

function processEvent(event, callback) {
    const params = qs.parse(event.body);
    const requestToken = params.token;
    if (requestToken !== token) {
        console.error(`Request token (${requestToken}) does not match expected`);
        return callback('Invalid request token');
    }

    const user = params.user_name;
    const command = params.command;
    const channel = params.channel_name;
    const commandText = params.text;
    let responseText = `Add some text for me to echo, like ${command} Hello!`;

    if (commandText !== '') {responseText = commandText;}
    callback(null, `{"response_type":"in_channel","text":"${responseText}"}`);
}

exports.handler = (event, context, callback) => {
    const done = (err, res) => callback(null, {
        statusCode: err ? '400' : '200',
        body: err ? (err.message || err) : res,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    processEvent(event, done);
};
