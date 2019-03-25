const accountSid = 'AXXXXXXXXXXXX';
const authToken = 'XXXXXXXXXXXXXXXXXX';
const client = require('twilio')(accountSid, authToken);

client.calls
      .create({
         url: 'https://23cd4a7f.ngrok.io',
         to: '+14043849673',
         from: '+14702603433'
       })
      .then(call => console.log(call.sid));
