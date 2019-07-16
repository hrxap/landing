const { Server } = require("./server");
let app = new Server(8080, "app/dist");

app.serveStaticFiles();
app.exposeConfig();
app.initializeMiddleware();
app.initializeControllers();
app.exposeEndpoints();
app.listen();
