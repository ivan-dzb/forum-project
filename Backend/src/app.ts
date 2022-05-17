import cors from "cors";
import express from "express";
import http from "http";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express"

import { NotFoundError, InvalidInputError } from "./utils/errors"
import UserRoute from "./routes/user.route"

const swaggerSetup = YAML.load("./swagger.yaml");
const app = express();
app.use(express.json());

const server = http.createServer(app);

var corsOptions = {
  origin: process.env.CLIENT,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());



//Home page
app.get("/", (req, res) => {
  res.status(200).send({ a: "Hola mundo" });
});

//Swagger
app.use("/doc-api", swaggerUi.serve, swaggerUi.setup(swaggerSetup));

app.use("/user", UserRoute);

app.use((err, req, res, next) => {
  console.log("error\n", err.message);
  if (err.details) return res.status(400).send(err.details[0].message);
  if (err instanceof NotFoundError) {
    return res.status(404).send(err.message);
  }
  if (err instanceof InvalidInputError) {
    return res.status(400).send(err.message);
  }
  res.status(503).send("Oooops something went wrong, try again");
});

export default server
