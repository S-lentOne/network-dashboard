import { devices } from "./devices";

Bun.listen({
  hostname: "0.0.0.0",
  port: 9000,

  socket: {
    data(socket, data) {
      try {
        const payload = data.toString();
        const message = JSON.parse(payload);

        const existing = devices.get(message.hostname);

        const logs = existing?.logs ? [...existing.logs] : [];

        logs.push({
          timestamp: Date.now(),
          direction: "RX",
          payload,
        });

        while (logs.length > 10) {
          logs.shift();
        }

        devices.set(message.hostname, {
          hostname: message.hostname,
          cpu: message.cpu,
          ram: message.ram,
          uptime: message.uptime,

          timestamp: Date.now(),

          logs,
        });

        console.log(`Update: ${message.hostname}`);
      } catch (err) {
        console.error(err);
      }
    },
  },
});

console.log("TCP Server running on :9000");

console.log("TCP Server running on :9000");
