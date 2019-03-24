'use strict';

var fs = require('fs');

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
    body: fs.readFileSync(__dirname + '/img_upload/public/Images/uploadedimage.jpg'),
    //, { encoding: 'base64'}),
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

// function to find max emotion in JSON
function findMaxJSON(jsonObj) {
  var keyArray = Object.keys(jsonObj);
  var max = 0;
  var maxKey = '';
  var x;
  for (x in keyArray) {
    if (jsonObj[keyArray[x]] > max) {
      max = jsonObj[keyArray[x]];
      maxKey = keyArray[x];
    }
  }
  return maxKey;
}

function getEmotion(callback) {
  request.post(options, (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    let jsonResponse = JSON.parse(body);
    console.log('JSON Response\n');
    console.log(jsonResponse);

    var sympt = findMaxJSON(jsonResponse[0]["faceAttributes"]["emotion"]);
    console.log(sympt);
    callback(sympt);
  })
}

exports.getEmotion = getEmotion;
