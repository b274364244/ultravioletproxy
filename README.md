# Procsy setup

Procsy runs on a separate origin from Gama Unlimited. It uses Ultraviolet and a
Wisp server, so a static host or Google Apps Script alone cannot run it.
Ultraviolet is archived and unsupported upstream.

## Try it locally

1. Install Node.js 22 or newer.
2. Open a terminal in this `procsy` folder and run `npm install`, then `npm start`.
   On Windows, use `npm.cmd` instead of `npm` if PowerShell blocks scripts.
3. Open the Gama Unlimited page and select **Procsy**. The local service is at
   `http://127.0.0.1:3031/`. Keep the terminal open while using it.

Browsers require HTTPS for service workers,
except on localhost and loopback addresses.

## Hosting

For access from other devices, deploy the `procsy` folder to a Node.js host
that supports a long-running process and WebSocket upgrades. Install with
`npm install`, start with `npm start`, and configure HTTPS and WebSocket
forwarding for `/wisp/`. The host must provide `PORT` and set `HOST=0.0.0.0`
if it requires the process to listen on all interfaces.

In the Gama Unlimited `index.html`, replace `http://127.0.0.1:3031/` with the
HTTPS URL of the deployed Procsy service. Keep the service on a separate
origin from the main site, and allow that origin to be embedded if your host
sets frame restrictions.

**Do not expose this service publicly as-is.** Wisp permits outbound network
requests, including potentially requests to private infrastructure. A public
deployment needs access controls, network restrictions, rate limits, and
monitoring appropriate to the host. The default local bind limits access to
the current computer. Review Ultraviolet's license before deployment:
https://github.com/titaniumnetwork-dev/Ultraviolet
