const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const bodyParser = require('body-parser');

app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173' }));

// aplication/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));
app.use("/files", express.static(path.resolve(__dirname, "src", "uploads")))

// Routes
app.use(require("./src/routes/userRoutes"));
app.use(require("./src/routes/publicationRouter"));
app.use(require("./src/routes/commentRouter"))

app.listen(4000, () => {
  console.log("Servidor rodando na porta 4000");
});
