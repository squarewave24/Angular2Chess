var ws = require('nodejs-websocket');
const port = 3006;

class GameServer {
    constructor() {
        this.svr = ws.createServer(conn => {
            console.log('New socket server connection established, ', new Date().toLocaleTimeString());
            // socket closing
            conn.on('close', function (code, reason) {
                console.log('socket connection closed.', new Date().toLocaleTimeString(), 'code: ', code);
            });

            conn.on('error', function (err) {
                // only throw if something else happens than Connection Reset
                if (err.code !== 'ECONNRESET') {
                    console.log('Error in socket server', err);
                }
            })
        });
        // this.startServer();
    }
    startServer() {
        this.svr.listen(port, function () {
            console.log(`socket server running on localhost:${port}`);
        });
    }
    streamMoves(moves) {
        console.log('streamng moves');
        var i = 0;
        var me = this; // callback hack 
        var interval = setInterval(function () {
            if (me.svr.connections.length > 0) {
                if (moves.length){
                    var move = moves.shift();
                    console.log(move);
                    me.svr.connections.forEach((function (conn) {
                            conn.send(JSON.stringify(move));
                    }));
                }
                else clearInterval(interval);
            }
        }, 1000);
    }

}

module.exports = GameServer;
