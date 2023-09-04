const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

app.use(helmet());
app.use(cors({ origin: 'http://localhost:3000' }));

// aplication/json
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

// Routes
app.use(require("./src/routes/userRoutes"));
app.use(require("./src/routes/publicationRouter"));

app.listen(4000, () => {
  console.log(`Servidor rodando na porta 4000`);
});
