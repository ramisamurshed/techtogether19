'use strict';

var fs = require('fs');
var bitmap = fs.readFileSync('/Users/ramisamurshed/techtogether19/img_upload/public/Images/uploadedimage.jpg', { encoding: 'base64'});

const request = require('request');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = 'e748a6bfea6a400dbfdc4d7122e8225d';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".

const uriBase = 'https://eastus.api.cognitive.microsoft.com/face/v1.0/detect';

//const imageUrl =
//    '/Users/ramisamurshed/techtogether19/img_upload/public/Images/uploadedimage.jpg';

// Request parameters.
const params = {
    'returnFaceId': 'false',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'emotion'
};

const options = {
    uri: uriBase,
    qs: params,
    body: fs.readFileSync('/Users/ramisamurshed/techtogether19/img_upload/public/Images/uploadedimage.jpg'),
    //, { encoding: 'base64'}),
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  console.log('JSON Response\n');
  console.log(jsonResponse);
});
