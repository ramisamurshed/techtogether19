const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;

http
  .createServer((req, res) => {
    // Create TwiML response
    const twiml = new VoiceResponse();

    twiml.say('This is an automated phone call from MySympTracker. Patient Jane Doe has been experiencing symptoms of depression. Please call them at 404 384 9673 to schedule an appointment with them regarding this.');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  })
  .listen(1337, '127.0.0.1');

console.log('TwiML server running at http://127.0.0.1:1337/');
