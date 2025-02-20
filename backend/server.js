const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let visitorCount = 0;

wss.on("connection", (ws) => {
    visitorCount++;
    console.log(`New visitor connected. Total: ${visitorCount}`);
    ws.send(JSON.stringify({ type: "count", count: visitorCount }));

    ws.on("close", () => {
        visitorCount--;
        console.log(`Visitor disconnected. Total: ${visitorCount}`);
    });
});

app.use(express.static("../frontend")); // Frontendni statik papkadan yuklash

app.get("/", (req, res) => {
    res.send("Backend ishlayapti!");
});

server.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
