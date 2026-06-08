import { devices } from "./devices";

Bun.serve({
  port: 3000,

  fetch() {
    return Response.json(Array.from(devices.values()));
  },
});

console.log("Dashboard on :3000");
