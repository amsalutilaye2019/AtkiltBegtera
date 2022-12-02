const secrets = require("../../config/secrets")
const OneSignal = require("onesignal-node");
const { oneSignalApiKey } = require("../../config/secrets");

const sendNotification = async(message, data, url) => {
    const client = new OneSignal.Client(secrets.oneSignalApp,oneSignalApiKey);
    const notification = createNotification(message, data, url)
    console.log("SENDING NOTIFICATION")
    try {
        const response = await client.createNotification(notification);
        console.log("RESPONSE: ", response);
    } catch (e) {
        if (e instanceof OneSignal.HTTPError) {
            // When status code of HTTP response is not 2xx, HTTPError is thrown.
            console.log(e.statusCode);
            console.log(e.body);
        }
    }
      
}   


const createNotification = (message, data, url) => {
    const notification = {
        contents: {
            'en': message,
        },
        data: data,
        included_segments: ['Subscribed Users'],
        url: url
    };

    return notification;
}

module.exports = {
    sendNotification,
    createNotification
}