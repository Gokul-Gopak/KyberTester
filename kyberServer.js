// server.js
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 8080;
console.log('Node.js version: ' + process.version);
const crypto = require('crypto');
// import crypto from 'crypto';
// import kyber from 'crystals-kyber';
const kyber = require('crystals-kyber');




// To generate a public and private key pair (pk, sk)Kyber
let pk_sk = kyber.KeyGen768();
let pk = pk_sk[0];
let sk = pk_sk[1];

// To generate a random 256 bit symmetric key (ss) and its encapsulation (c)
let c_ss = kyber.Encrypt768(pk);
let c = c_ss[0];
let ss1 = c_ss[1];

const iv = crypto.randomBytes(16); // 128-bit initialization vector

// Handle incoming socket connections
io.on('connection', (socket) => {
    console.log('a user connected');

    // Handle incoming new user event
    socket.on("new user", (username) => {
        console.log(`User ${username} connected`);
        socket.username = username;
    });

    // Handle incoming chat messages
    socket.on('chat message', (message) => {
        const username = socket.username;
        const cipher = crypto.createCipheriv('aes-256-cbc', ss1, iv);

        let encrypted = cipher.update(message, 'utf8', 'base64');
        encrypted += cipher.final('base64');
        console.log('Encrypted:', encrypted);

        let ss2 = kyber.Decrypt768(c, sk);

        const decryptedCipher = crypto.createDecipheriv('aes-256-cbc', ss2, iv);
        let decrypted = decryptedCipher.update(encrypted, 'base64', 'utf8');
        decrypted += decryptedCipher.final('utf8');

        // Broadcast both the encrypted and decrypted messages to all connected clients

        io.emit("chat message", { username: username, decrypted: decrypted });
    });

    // Handle socket disconnections
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
// Start the server
http.listen(port, () => {
    console.log(`listening on *:${port}`);
});