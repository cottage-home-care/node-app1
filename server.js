const http = require("http");

const PORT = process.env.PORT || 5000;

// Static data for /get-users
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "admin" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "user" },
];

// Static data for /get-info
const appInfo = {
  name: "node_app1",
  version: "1.0.0",
  description: "A simple Node.js app with two endpoints.",
  author: "rakib@cottagehomecare.com",
  endpoints: ["/get-users", "/get-info"],
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET") {
    return sendJson(res, 405, { error: "Method Not Allowed" });
  }

  switch (req.url) {
    case "/get-users":
      return sendJson(res, 200, { users });
    case "/get-info":
      return sendJson(res, 200, appInfo);
    default:
      return sendJson(res, 404, { error: "Not Found" });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log("Endpoints:");
  console.log(`  GET http://localhost:${PORT}/get-users`);
  console.log(`  GET http://localhost:${PORT}/get-info`);
});
