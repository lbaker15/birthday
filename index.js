
const AWS = require('aws-sdk');
const Twilio = require('twilio');

exports.handler = async (event) => {
    const accountSid = process.env.ACCOUNT; 
    const authToken = process.env.AUTH;
    const client = new Twilio(accountSid, authToken);
    console.log(event, event.message)
    try {
        const message = await client.messages.create({
            body: event.message,
            to: event.phone, 
            from: '+447883302464' 
        });

        console.log(message.sid);
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Message sent successfully.', sid: message.sid }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to send message.' }),
        };
    }
};
