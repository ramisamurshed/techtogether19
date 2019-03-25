const accountSid = 'AXXXXXXXXXXXX';
const authToken = 'XXXXXXXXXXXXXXXXXX';
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'https://ab675948.ngrok.io',
         to: '+14043849673',
         from: '+14702603433'
       })
      .then(call => console.log(call.sid));
