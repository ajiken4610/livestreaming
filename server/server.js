const admin = require("firebase-admin");
const firestore = require("firebase-admin/firestore");
const ws = require("ws");
var Server = ws.Server;
var webSocket = new Server({ port: 3050 });
var serviceAccount = require("C:\\Users\\user\\Documents\\serviceaccountkey\\livestreamingstate-firebase-adminsdk-t37gc-20b1bf10ee.json");
var app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
var db = firestore.getFirestore(app);
console.log(db);
var doc = db.doc("state/yuki");
var currentState = {};
var unsub = doc.onSnapshot((snapshot) => {
  var data = snapshot.data();
  currentState = data;
  console.log(data);
  webSocket.clients.forEach((client) => {
    client.send(JSON.stringify(data));
  });
});
webSocket.on("connection", (client) => {
  client.send(JSON.stringify(currentState));
});
// 後始末
process.on("exit", (exitCode) => {
  unsub();
});
process.on("SIGINT", () => process.exit(0));
