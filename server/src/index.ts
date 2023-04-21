import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import * as morgan from "morgan";
const AnonymousStrategy = require("passport-anonymous").Strategy;

import { port, secretOrKey, defAdminPwd } from "./config";
import { User, UserRole } from "./entity/User";
import { passwordhasher } from "./services";
import { dayJob, minuteJob, monthJob, yearJob } from "./cron-jobs";
import { Stats } from "./entity/Stats";

var session = require("express-session");
var passport = require("passport");
const cors = require("cors");

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
    require("./routes/codeRoutes")(app, passport);
    require("./routes/userRoutes")(app, passport);
    app.listen(port);
    let number = (await connection.getRepository(User).findAndCount())[1];

    if (number === 0) {
      console.log("hi");

      let userAdminBase = new User();
      userAdminBase.role = UserRole.ADMIN;
      userAdminBase.email = "a";

      userAdminBase.password = await passwordhasher(defAdminPwd.toString());

      userAdminBase.profileDone = false;

      let statsMain = new Stats();
      statsMain.name = "MAIN"

      await connection.manager.save(statsMain)
      await connection.manager.save(userAdminBase);

      console.log("Username", "messadminstration@nitdgp.ac.in", defAdminPwd);
    }

    //minuteJob.start();
    dayJob.start();
    monthJob.start();
    yearJob.start();

    // insert new users for test

    console.log(
      `Express server has started on port ${port}. Open http://localhost:${port}/ to see results`
    );
  })
  .catch((error) => console.log(error));
