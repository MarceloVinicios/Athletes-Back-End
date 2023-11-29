const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const configureSocketIO = require("./src/socket/socket");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(helmet());
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/files", express.static(path.resolve(__dirname, "src", "uploads")));

app.use(require("./src/routes/categoryRouter"));
app.use(require("./src/routes/likesRouter"));
app.use(require("./src/routes/commentRouter"));
app.use(require("./src/routes/publicationRouter"));
app.use(require("./src/routes/userRoutes"));

const server = http.createServer(app);
configureSocketIO(server);

server.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
