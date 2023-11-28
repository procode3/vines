import express from "express";
import { readdirSync } from "fs";
import cors from "cors";
import 'dotenv/config'
import session from "express-session";
import passport from 'passport';

import { errorHandler } from "./middlewares/errorHandler";
import { helloController } from "./controllers";


const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./swagger");

const app = express();

app.use(session({
    secret: process.env.SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

//  Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerOptions));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());




//serve all routes dynamically using readdirsync
readdirSync("./src/routes").map((path) => {
    if (path === "auth.routes.ts") {
        app.use("/auth", require(`./routes/${path}`));
    } else {
        app.use("/api/v1", require(`./routes/${path}`));
    }

});
app.get("/", helloController);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});