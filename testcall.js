const accountSid = 'ACa154621e8d0302fffa0ce8422ec3ffa9';
const authToken = '2c0f9b5ffdca73c9e6467e7cb4e40344';
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'https://f8cb7958.ngrok.io',
         to: '+14043849673',
         from: '+14702603433'
       })
      .then(call => console.log(call.sid));