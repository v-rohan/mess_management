import { getManager, getRepository, ILike, Like } from "typeorm";
import { NextFunction, Request, Response, Express } from "express";
import { User, UserRole } from "../entity/User";
import { Code, MealType } from "../entity/Code";
import { secretOrKey } from "../config";
import { generateunique } from "../services";
import { IGetUserAuthInfoRequest } from "../types";
import { passwordhasher } from "../services";
import { AdminCheck } from "../middleware/AuthMiddleware";
import fetch from "node-fetch";
import { Stats } from "../entity/Stats";
import { scheduler } from "../cron-jobs";

var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

module.exports = (app: Express, passport: any) => {
  require("../passport/jwt")(passport);
  //require("../passport/google")(passport);
  //signup
  app.post(
    "/generatecode",
    passport.authenticate("jwt", { session: false }),
    async (
      request: IGetUserAuthInfoRequest,
      response: Response,
      next: NextFunction
    ) => {
      console.log(request.user);

      if (request.user.codeBlock !== true) {
        try {
          var newCode = new Code();

          let b_s = "07:55:00";
          let b_e = "09:45:00";

          let l_s = "11:59:45";
          let l_e = "13:45:00";

          let s_s = "11:59:45";
          let s_e = "13:45:00";

          let d_s = "19:59:45";
          let d_e = "21:45:00";

          let currentDate = new Date();

          let bsd = new Date(currentDate.getTime());
          bsd.setHours(Number(b_s.split(":")[0]));
          bsd.setMinutes(Number(b_s.split(":")[1]));
          bsd.setSeconds(Number(b_s.split(":")[2]));

          let bed = new Date(currentDate.getTime());
          bed.setHours(Number(b_e.split(":")[0]));
          bed.setMinutes(Number(b_e.split(":")[1]));
          bed.setSeconds(Number(b_e.split(":")[2]));

          let lsd = new Date(currentDate.getTime());
          lsd.setHours(Number(l_s.split(":")[0]));
          lsd.setMinutes(Number(l_s.split(":")[1]));
          lsd.setSeconds(Number(l_s.split(":")[2]));

          let led = new Date(currentDate.getTime());
          led.setHours(Number(l_e.split(":")[0]));
          led.setMinutes(Number(l_e.split(":")[1]));
          led.setSeconds(Number(l_e.split(":")[2]));

          let ssd = new Date(currentDate.getTime());
          lsd.setHours(Number(s_s.split(":")[0]));
          lsd.setMinutes(Number(s_s.split(":")[1]));
          lsd.setSeconds(Number(s_s.split(":")[2]));

          let sed = new Date(currentDate.getTime());
          led.setHours(Number(s_e.split(":")[0]));
          led.setMinutes(Number(s_e.split(":")[1]));
          led.setSeconds(Number(s_e.split(":")[2]));

          let dsd = new Date(currentDate.getTime());
          dsd.setHours(Number(d_s.split(":")[0]));
          dsd.setMinutes(Number(d_s.split(":")[1]));
          dsd.setSeconds(Number(d_s.split(":")[2]));

          let ded = new Date(currentDate.getTime());
          ded.setHours(Number(d_e.split(":")[0]));
          ded.setMinutes(Number(d_e.split(":")[1]));
          ded.setSeconds(Number(d_e.split(":")[2]));

          if (bsd < currentDate && bed > currentDate) {
            newCode.role = MealType.BREAKFAST;
          } else if (lsd < currentDate && led > currentDate) {
            newCode.role = MealType.LUNCH;
          } else if (dsd < currentDate && ded > currentDate) {
            newCode.role = MealType.DINNER;
          } else if (ssd < currentDate && sed > currentDate) {
            newCode.role = MealType.SNACKS;
          } else throw new Error("Not meal time");

          //newCode.role = MealType[`${request.body.mealType}`];
          newCode.sessionId = generateunique();
          newCode.user = request.user;
          await getManager()
            .transaction(async (transactionalEntityManager) => {
              await transactionalEntityManager
                .save(newCode)
                .then((code) => {
                  console.log(code);
                  response.status(200).json({ code: code.sessionId });
                })
                .catch((error) => {
                  throw error;
                });
            })
            .catch((error) => {
              throw error;
            });
        } catch (error) {
          console.log(error);
          response.status(400).send(error);
        }
      } else response.status(403).send("1 hours hasn't passed ");
    }
  );

  app.get(
    "/verify/:id",
    passport.authenticate("jwt", { session: false }),
    async (
      request: IGetUserAuthInfoRequest,
      response: Response,
      next: NextFunction
    ) => {
      if (
        request.user.role === UserRole.ADMIN ||
        request.user.role === UserRole.MESS_WORKER
      ) {
        try {
          await getRepository(Code)
            .findOneOrFail({ where: { sessionId: request.params.id },relations:['user'] })
            .then(async (code) => {
              await getRepository(Code)
                .remove(code)
                .then(async () => {
                  await getRepository(Stats)
                    .findOne()
                    .then(async (status) => {
                      console.log(code);

                      if (code.role === MealType.BREAKFAST) {
                        status.breakfast_day_no++;
                        status.breakfast_month_no++;
                        status.breakfast_yearly_no++;

                        await getRepository(Stats)
                          .save(status)
                          .catch((err) => {
                            throw err;
                          });
                      } else if (code.role === MealType.LUNCH) {
                        status.lunch_day_no++;
                        status.lunch_month_no++;
                        status.lunch_yearly_no++;

                        await getRepository(Stats)
                          .save(status)
                          .catch((err) => {
                            throw err;
                          });
                      } else if (code.role === MealType.DINNER) {
                        status.din_day_no++;
                        status.din_month_no++;
                        status.din_yearly_no++;

                        await getRepository(Stats)
                          .save(status)
                          .catch((err) => {
                            throw err;
                          });
                      } else {
                        status.sn_day_no++;
                        status.sn_month_no++;
                        status.sn_yearly_no++;
                      }
                    });

                  let user = code.user;
                  if (code.role === MealType.BREAKFAST) {
                    user.break_no--;
                  } else if (code.role === MealType.LUNCH) {
                    user.lunch_no--;
                  } else if (code.role === MealType.DINNER) {
                    user.din_no--;
                  } else {
                    user.sn_no--;
                  }

                  user.codeBlock = false;
                  //scheduler(user.id);

                  await getRepository(User)
                    .save(user)
                    .then(() => {
                      response.sendStatus(200);
                    });
                });
            });
        } catch (err) {
          console.log(err);
          
          response.status(500).send(err);
        }
      } else response.sendStatus(401);
    }
  );

  app.get(
    "/check/:id",
    passport.authenticate("jwt", { session: false }),
    async (
      request: IGetUserAuthInfoRequest,
      response: Response,
      next: NextFunction
    ) => {
      if (request.user.role === UserRole.USER) {
        try {
          await getRepository(Code)
            .findOneOrFail({ where: { sessionId: request.params.id } })
            .then(async () => {
              response.sendStatus(500);
            });
        } catch (err) {
          response.sendStatus(200);
        }
      } else response.sendStatus(401);
    }
  );
};
