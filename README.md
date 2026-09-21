# Raspberry Pi Network Monitoring Dashboard

## Overview

The Raspberry Pi Network Monitoring Dashboard is a lightweight client-server network monitoring system developed using Bun and TypeScript.

The project consists of:

* A monitoring client that collects system information from connected devices
* A TCP server that receives and stores monitoring data
* A web dashboard that visualizes device statistics in real time

The dashboard displays:

* Hostname
* CPU Usage
* RAM Usage
* System Uptime
* Recent Packet Logs

The system was designed to demonstrate core Network Programming concepts including TCP communication, client-server architecture, packet processing, and real-time monitoring.

---

## Features

### Device Monitoring

Connected devices periodically transmit:

* Hostname
* CPU Usage (%)
* RAM Usage (%)
* Uptime

to the Raspberry Pi server.

### Real-Time Dashboard

The web dashboard updates automatically without requiring manual refreshes.

### Packet Logging

Each device maintains a history of recently received monitoring packets.

### Interactive User Interface

* CPU usage visualization
* RAM usage visualization
* Uptime display
* Device selection
* Packet log viewer

---

## Technologies Used

### Backend

* Bun Runtime
* TypeScript
* TCP Sockets

### Frontend

* HTML
* CSS
* JavaScript

### Hardware

* Raspberry Pi 3B+

---

## Project Structure

```text
network-dashboard/

├── client/
│   └── monitor.ts
│
├── server/
│   ├── dashboard.ts
│   ├── devices.ts
│   ├── tcp.ts
│   └── app.js
│
├── shared/
│   └── type.ts
│
├── uploads/
│
├── package.json
├── bun.lock
└── README.md
```

---

## Installation

Install dependencies:

```bash
bun install
```

---

## Running the Project

Start the TCP Monitoring Server:

```bash
bun server/tcp.ts
```

Start the Dashboard Server:

```bash
bun server/dashboard.ts
```

Start a Monitoring Client:

```bash
bun client/monitor.ts
```

---

## Dashboard Access

Open:

```text
http://localhost:3000
```

or

```text
http://<raspberry-pi-ip>:3000
```

from any device on the same network.

---

## Network Programming Concepts Demonstrated

* TCP Socket Communication
* Client-Server Architecture
* Data Serialization using JSON
* Periodic Network Updates
* Device Monitoring
* Packet Logging
* Real-Time Dashboard Visualization

---

## Future Improvements

* Historical Data Storage
* Device Authentication
* WebSocket-Based Updates
* Network Traffic Analysis
* File Transfer Support
* Multi-Network Monitoring
