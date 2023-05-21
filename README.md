# Kyber Chatroom
This is a simple chat application built using Socket.IO and Node.js. It allows users to send and receive encrypted chat messages in real-time.

Table of Contents
Overview
Installation
Usage
Encryption
License
Overview
The chat application consists of a client-side HTML file (index.html) and a server-side JavaScript file (server.js). The HTML file provides the chat interface, while the server handles incoming socket connections and manages the chat functionality.

The application utilizes the Socket.IO library for real-time communication between the client and the server. Encryption is achieved using the AES-256-CBC symmetric encryption algorithm and the Kyber library for key generation and encapsulation.

Installation
To run the chat application locally, follow these steps:

Make sure you have Node.js and npm (Node Package Manager) installed on your machine.
Clone this repository to your local machine.
Navigate to the project directory using a command line interface.
Install the required dependencies by running the following command:
Copy code
npm install
Usage
To start the chat application, run the following command in the project directory:

sql
Copy code
npm start
This will start the server and make the application accessible at http://localhost:8080 in your web browser.

When the application loads, you will be prompted to enter a username. Once you provide a username, you can start sending and receiving encrypted chat messages in real-time.

Encryption
The chat messages in this application are encrypted to ensure secure communication between users. The encryption process involves the following steps:

Key Generation: A public-private key pair is generated using the Kyber library. The public key is shared with all connected clients, while the private key is kept secret.

Symmetric Key Generation: A random 256-bit symmetric key is generated as the shared secret key. The key is then encapsulated using the public key generated in the previous step.

Message Encryption: When a user sends a chat message, it is encrypted using the AES-256-CBC encryption algorithm and the symmetric key. The encrypted message is then sent to the server.

Message Decryption: The server receives the encrypted message and decrypts it using the symmetric key obtained from the encapsulation process. The decrypted message is then broadcasted to all connected clients.
