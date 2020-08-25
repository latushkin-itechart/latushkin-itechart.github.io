const webPush = require('web-push');
const keys = require('./keys.json');
const getSubscriptions = require('./getSubscriptions');

webPush.setVapidDetails(
    'mailto:latushkin.itechart@outlook.com',
    keys.public,
    keys.private,
);

module.exports = (app) => {

    app.post('/send-notification/', async (req, res) => {
        const title = req.body.title;
        const body = req.body.body;

        const data = {notification: {title, body}};

        const promises = getSubscriptions().map((subscription) => {
            return webPush.sendNotification(subscription, JSON.stringify(data)).catch((err) => console.log(err));
        })

        await Promise.all(promises);

        res.json({});
    })
}