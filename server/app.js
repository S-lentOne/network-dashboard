let selectedDevice = null;

async function updateDevices() {
  const response = await fetch("/api/devices");
  const devices = await response.json();

  renderDevices(devices);

  const selected = devices.find((d) => d.hostname === selectedDevice);

  if (!selected) {
    document.getElementById("log-panel").innerHTML = "<h2>Select a device</h2>";

    return;
  }

  document.getElementById("log-panel").innerHTML = `
        <h2>
            ${selected.hostname}
        </h2>

        ${selected.logs
          .slice()
          .reverse()
          .map(
            (log) => `
                <div class="log">
                    <strong>
                        ${new Date(log.timestamp).toLocaleTimeString()}
                    </strong>

                    <br>

                    ${log.payload}
                </div>
            `,
          )
          .join("")}
    `;
}

function shortUptime(seconds) {
  const days = seconds / 86400;

  if (days >= 1) return `${days.toFixed(2)} D`;

  const hours = seconds / 3600;

  if (hours >= 1) return `${hours.toFixed(2)} H`;

  return `${(seconds / 60).toFixed(2)} M`;
}

function fullUptime(seconds) {
  const d = Math.floor(seconds / 86400);

  seconds %= 86400;

  const h = Math.floor(seconds / 3600);

  seconds %= 3600;

  const m = Math.floor(seconds / 60);

  const s = Math.floor(seconds % 60);

  return `${d} Days ${h} Hours ${m} Minutes ${s} Seconds`;
}

function showLogs(hostname) {
  selectedDevice = hostname;

  updateDevices();
}

function renderDevices(devices) {
  const container = document.getElementById("devices");

  container.innerHTML = devices
    .map((device) => {
      const cpuDegrees = device.cpu * 3.6;

      const ramDegrees = device.ram * 3.6;

      const selected = device.hostname === selectedDevice ? "selected" : "";

      return `
                <div
                    class="card ${selected}"
                    onclick="showLogs('${device.hostname}')"
                >

                    <div class="hostname">
                        ${device.hostname}
                    </div>

                    <div class="stats">

                        <div
                            class="circle cpu"
                            style="
                                background:
                                conic-gradient(
                                    #ff9ed6 ${cpuDegrees}deg,
                                    #ffffff66 0deg
                                );
                            "
                        >
                            <span
                                class="circle-label"
                                data-value="${device.cpu}%"
                            >
                                CPU
                            </span>
                        </div>

                        <div
                            class="circle ram"
                            style="
                                background:
                                conic-gradient(
                                    #9ecfff ${ramDegrees}deg,
                                    #ffffff66 0deg
                                );
                            "
                        >
                            <span
                                class="circle-label"
                                data-value="${device.ram}%"
                            >
                                RAM
                            </span>
                        </div>

                    </div>

                    <div
                        class="uptime"
                        title="${fullUptime(device.uptime)}"
                    >
                        ${shortUptime(device.uptime)}
                    </div>

                </div>
            `;
    })
    .join("");
}

updateDevices();

setInterval(updateDevices, 1000);
