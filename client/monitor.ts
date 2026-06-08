import si from "systeminformation";
import os from "os";

const HOST = "localhost";
const PORT = 9000;

async function sendStatus() {

    const cpu = await si.currentLoad();
    const mem = await si.mem();

    const payload = {
        hostname: os.hostname(),
        cpu: Math.round(cpu.currentLoad),
        ram: Math.round(
            (mem.used / mem.total) * 100
        ),
        uptime: Math.floor(
            process.uptime()
        )
    };

	const socket = await Bun.connect({
	    hostname: HOST,
	    port: PORT,

	    socket: {
	        data() {},

	        open(sock) {
	            sock.write(JSON.stringify(payload));
	            console.log(payload);
	            sock.end();
	        },

	        error(sock, err) {
	            console.error(err);
	        }
	    }
	});
};

setInterval(sendStatus, 5000);
