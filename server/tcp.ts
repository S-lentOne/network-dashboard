import { devices } from "./devices";

Bun.listen({
  hostname: "0.0.0.0",
  port: 9000,

  socket: {
    data(socket, data) {
      try {
        const message = JSON.parse(data.toString());

        devices.set(message.hostname, {
          ...message,
          timestamp: Date.now(),
        });

        console.log("Update:", message.hostname);
        console.log("Received:", data.toString());
      } catch (err) {
        console.error(err);
      }
    },
  },
});

console.log("TCP Server running on :9000");
