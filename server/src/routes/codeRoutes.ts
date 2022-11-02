import { getManager, getRepository, ILike, Like } from "typeorm";
import { NextFunction, Request, Response, Express } from "express";
import { User, UserRole } from "../entity/User";
import { Code, MealType } from "../entity/Code";
import { secretOrKey } from "../config";
import { generateunique } from "../services"
import { IGetUserAuthInfoRequest } from "../types";
import { passwordhasher } from "../services";
import { AdminCheck } from "../middleware/AuthMiddleware";
import fetch from "node-fetch";

var bcrypt = require("bcryptjs");
var crypto = require("crypto");
var jwt = require("jsonwebtoken");

module.exports = (app: Express, passport: any) => {
  require("../passport/jwt")(passport);
  require("../passport/google")(passport);
  //signup
  app.post(
    "/generatecode",
    passport.authenticate("jwt", { session: false }),
    async (request: IGetUserAuthInfoRequest, response: Response, next: NextFunction) => {
      var newCode = new Code();
      newCode.role = MealType[`${request.body.mealType}`]
      newCode.sessionId = generateunique()
      newCode.user = request.user
      try {
        await getManager()
          .transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager
              .save(newCode)
              .then((code) => {
                console.log(code);
                response.sendStatus(200)
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
    }
  );

  app.get(
    "/verify:id",
    passport.authenticate("jwt", { session: false }),
    async (
      request: IGetUserAuthInfoRequest,
      response: Response,
      next: NextFunction
    ) => {
      if (request.user.role === UserRole.ADMIN || request.user.role === UserRole.MESS_WORKER) {
        try{
        await getRepository(Code)
          .findOneOrFail({where: {sessionId: request.params.id}})
          .then(async (code) => {
            await getRepository(Code).remove(code)
            response.sendStatus(200)
          })
        }
        catch(err){
          response.status(500).send(err);
        }
      }
    }
  );


};
