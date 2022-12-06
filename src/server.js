const http = require('http');
const mongoose = require('./database/connection');

const app = require('./app');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT} at http://localhost:${PORT}`);
    });
}

startServer();