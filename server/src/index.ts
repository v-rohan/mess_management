import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as morgan from "morgan";
const AnonymousStrategy = require("passport-anonymous").Strategy;

import { port, secretOrKey } from "./config";

var session = require("express-session");
var passport = require("passport");
const cors = require("cors");

// function handleError(err, req: Request, res: Response, next: Function) {
//     console.error(err);
//     res.status(err.statusCode || 500).send(err.message);
// }

createConnection()
  .then(async (connection) => {
    // create express app
    console.log("Connected to db");
    const app = express();
    app.use(
      session({
        secret: secretOrKey,
        resave: false,
        saveUninitialized: true,
      })
    ); // session secret

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(morgan("tiny"));
    app.use(bodyParser.json());
    app.use(cors());

    passport.use(new AnonymousStrategy());

    // register express routes from defined application routes
    require("./routes/userRoutes")(app, passport);
    app.listen(port);

    // insert new users for test

    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port}/ to see results`
    );
  })
  .catch((error) => console.log(error));
