import http from "node:http";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";
import { uvPath } from "@titaniumnetwork-dev/ultraviolet";
import { epoxyPath } from "@mercuryworkshop/epoxy-transport";
import { baremuxPath } from "@mercuryworkshop/bare-mux/node";

const directory = dirname(fileURLToPath(import.meta.url));
const app = express();
app.get("/", (request, response) => response.sendFile(join(directory, "index.html")));
app.get("/uv/uv.config.js", (request, response) => response.sendFile(join(directory, "uv.config.js")));
app.use("/uv/", express.static(uvPath));
app.use("/epoxy/", express.static(epoxyPath));
app.use("/baremux/", express.static(baremuxPath));

const server = http.createServer(app);
server.on("upgrade", (request, socket, head) => {
  if (request.url === "/wisp/") wisp.routeRequest(request, socket, head);
  else socket.destroy();
});

const host = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || 3031);
server.listen(port, host, () => {
  console.log(`Procsy listening on http://${host}:${port}`);
});
