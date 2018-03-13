import net from 'net';
import session from './session';
const HOST = '127.0.0.1';
const PORT = 3333;
let server;
export function startServer(A, B, C) {
    server = net.createServer();
    server.listen(PORT, HOST, () => {
        console.log('Server listening on' + server.address().address + ':' + server.address().port);
    });

    return new Promise(resolve => {
        server.on('connection', (sock) => {
            console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
            let session = new session(sock, sock);
            let resolveData = new Array();
            sock.on('error', err => {
                if (err) {
                    console.log('------------', err);
                }
            });
            sock.on('close', (data) => {
                console.log('CLOSED:' + sock.remoteAddress + '' + sock.remotePort);
                session = null;
            });

            session.on('ready', (data) => {
                console.log('ready', data);
                session.send(
                    {
                        "jsonrpc": "2.0",
                        "id": "",
                        "method": "",
                        "parmas": {}
                    }
                )
            });

            session.on('jsonrpc', (data) => {
                if (data.id ===) {
                    console.log();
                    session.send({
                        "jsonrpc": "2.0",
                        "id": "",
                        "method": "",

                    })
                    resolve(data)
                }
            })
        })
    })
}