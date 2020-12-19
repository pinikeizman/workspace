import { config } from "../../config";
import { User } from "../types";

export function createWSClient(user: User): WebSocket {
    const {port = '', hostname, protocol} = config.default.ws;
    const socket = new WebSocket(`${protocol || 'ws'}://${hostname}${port && [':', port].join('')}/ws?username=${user.userName}`);
    socket.addEventListener('error', (e) => console.error(e));
    socket.addEventListener('close', (e) => console.info(e));
    socket.addEventListener('open', function (event) {
        console.log('connected');
    });

    window.onbeforeunload = function () {
        socket.onclose = function () {
        }; // disable onclose handler first
        socket.close();
    };

    return socket
}
