# Install server

```
npm install
node index.js
```

Open `http://localhost:800` to view website.
When firstly opened, client subscribes to push notifications and send details to backend.
Client code is located in `/static/` folder.

In Postman or via CURL trigger HTTP request:

```
POST http://localhost:800/send-notification/
Content-Type: application/json
{"title": "Notification title", "body": "Notification body"}
```

Backend code is located in `/index.js` script. Sender code is in `/src/send.js` script.

