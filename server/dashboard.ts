import { devices } from "./devices";

const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Network Dashboard</title>

    <style>
    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        padding: 2rem;

        font-family:
            Inter,
            system-ui,
            sans-serif;

        background:
            linear-gradient(
                135deg,
                #ffe5ec,
                #e0c3fc,
                #cde7ff
            );

        min-height: 100vh;

        color: #554565;
    }

    h1 {
        margin-bottom: 2rem;
    }

    #devices {
        display: grid;

        grid-template-columns:
            repeat(auto-fit, minmax(350px, 1fr));

        gap: 1.5rem;
    }

    .card {
    background:
        rgba(255,255,255,0.45);

        backdrop-filter: blur(12px);

        border-radius: 24px;

        padding: 1.5rem;

        border:
            1px solid rgba(
                255,
                255,
                255,
                0.4
            );

        box-shadow:
            0 8px 32px
            rgba(0,0,0,0.08);

        transition:
            transform .2s,
            box-shadow .2s;
    }

    .card:hover {
        transform:
            translateY(-4px);

        box-shadow:
            0 12px 36px
            rgba(0,0,0,0.12);
    }

    .hostname {
        font-size: 2.4rem;
        font-weight: bold;

        margin-bottom: 1rem;
    }

    .stats {
        display: flex;

        justify-content: space-around;

        margin-bottom: 1rem;
    }

    .circle {
        width: 90px;
        height: 90px;

        border-radius: 50%;

        display: flex;
        align-items: center;
        justify-content: center;

        font-weight: bold;

        position: relative;
    }

    .circle::after {
        content: "";

        position: absolute;

        width: 70px;
        height: 70px;

        border-radius: 50%;

        background: #a69ee6;
    }

    .circle span {
        position: relative;
        z-index: 2;
    }

    .uptime {
        margin: 1rem auto;

        width: fit-content;

        background: #a69ee6;

        padding: .5rem 1rem;

        border-radius: 999px;

        font-weight: bold;
    }

    details {
        margin-top: 1rem;
    }

    .log {
        margin-top: .5rem;

        padding: .5rem;

        border-radius: 8px;

        background: #0f172a;

        font-family: monospace;

        font-size: .8rem;
    }

    .circle-label {
        position: relative;
        z-index: 5;

        transition: .2s;
    }

    .circle:hover .circle-label {
        font-size: 0;
    }

    .circle:hover .circle-label::after {
        content:
            attr(data-value);

        font-size: 1rem;

        font-weight: bold;
    }

    #log-panel {

        margin-top: 2rem;

        background:
            rgba(255,255,255,0.65);

        backdrop-filter: blur(12px);

        border-radius: 24px;

        padding: 1rem;

        min-height: 250px;

        box-shadow:
            0 8px 32px
            rgba(0,0,0,0.08);
    }

    .card.selected {

        outline:
            3px solid #ff9ed6;

        transform:
            translateY(-4px);
    }

    .log {

        margin-top: .5rem;

        padding: .75rem;

        border-radius: 12px;

        background:
            rgba(255,255,255,0.4);

        font-family: monospace;

        overflow-wrap: break-word;
    }

    .card {
        cursor: pointer;
    }

    </style>
</head>

<body>

<h1>Network Dashboard</h1>


<div id="devices"></div>
<div id="log-panel">
    Select a device
</div>

<script src="/app.js"></script>

</body>
</html>
`;

Bun.serve({
  port: 3000,

  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/devices") {
      return Response.json(Array.from(devices.values()));
    }

    if (url.pathname === "/app.js") {
      return new Response(Bun.file("server/app.js"));
    }

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
});

console.log("Dashboard on :3000");
