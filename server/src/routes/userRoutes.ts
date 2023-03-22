import { getManager, getRepository, ILike, Like } from "typeorm";
import { NextFunction, Request, Response, Express } from "express";
import { User, UserRole } from "../entity/User";
import { secretOrKey } from "../config";
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

  app.post(
    "/updateuser",
    passport.authenticate("jwt", { session: false }),
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      var user = await getRepository(User).findOne({
        where: { id: req.user.id },
      });
      user = { ...user, ...req.body };
      await getRepository(User)
        .save(user)
        .then(() => {
          return res.status(200).json(user);
        });
    }
  );

  //signup
  app.post(
    "/register",
    async (request: Request, response: Response, next: NextFunction) => {
      var newUser = new User();
      newUser.email = request.body.email;
      newUser.role = UserRole.ADMIN;
      try {
        newUser.password = await passwordhasher(request.body.password);
        await getManager()
          .transaction(async (transactionalEntityManager) => {
            await transactionalEntityManager
              .save(newUser)
              .then((user) => {
                console.log(user);
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

  app.post(
    "/login",
    async (request: Request, response: Response, next: NextFunction) => {
      var email = request.body.email;
      var password = request.body.password;
      try {
        var user = await getRepository(User).findOne({ email: email });
        bcrypt.compare(password, user.password, function (err, result) {
          if (result) {
            const payload = {
              id: user.id,
              email: user.email,
              role: user.role,
            };

            var token = jwt.sign(payload, secretOrKey, {
              expiresIn: 600000,
            });

            response.status(200).json({
              token: "Bearer " + token,
              role: payload.role
            });
          } else response.status(403).send("Invalid email or password");
        });
      } catch (error) {
        response.status(500).send(error);
      }
    }
  );

  app.post(
    "/adminlogin",
    async (request: Request, response: Response, next: NextFunction) => {
      var email = request.body.email;
      var password = request.body.password;
      try {
        var user = await getRepository(User).findOne({ email: email });
        console.log(user);
        bcrypt.compare(password, user.password, function (err, result) {
          if (result && user.role == UserRole.ADMIN) {
            const payload = {
              id: user.id,
              email: user.email,
              role: user.role,
            };

            var token = jwt.sign(payload, secretOrKey, {
              expiresIn: 600000,
            });

            response.status(200).json({
              token: "Bearer " + token,
            });
          } else if (result) {
            response.status(403).send("User not an admin");
          } else response.status(403).send("Invalid email or password");
        });
      } catch (error) {
        response.status(500).send(error);
      }
    }
  );

  app.get(
    "/google",
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })
  );

  app.get(
    "/google/callback",
    passport.authenticate("google"),
    (request: IGetUserAuthInfoRequest, response: Response) => {
      const payload = {
        id: request.user.id,
        email: request.user.email,
        role: request.user.role,
      };

      var token = jwt.sign(payload, secretOrKey, {
        expiresIn: 600000,
      });

      response.status(200).json({
        token: "Bearer " + token,
      });
    }
  );

  app.post("/googleapp", async (request: Request, response: Response) => {
    try {
      const res = await fetch(
        "https://www.googleapis.com/oauth2/v3/userinfo?access_token=" +
          request.body.accessToken
      );
      const data: any = await res.json();
      await getRepository(User)
        .findOne({ email: data.email })
        .then(async (user) => {
          if (user) {
            const payload = {
              id: user.id,
              email: user.email,
              role: user.role,
            };

            var token = jwt.sign(payload, secretOrKey, {
              expiresIn: 600000,
            });

            response.status(200).json({
              token: "Bearer " + token,
            });
          } else {
            user = new User();
            user.email = data.email;
            user.password = data.sub;

            getRepository(User)
              .save(user)
              .then(async (savedUser) => {
                const payload = {
                  id: savedUser.id,
                  email: savedUser.email,
                  role: savedUser.role,
                };

                var token = jwt.sign(payload, secretOrKey, {
                  expiresIn: 600000,
                });

                response.status(200).json({
                  token: "Bearer " + token,
                });
              });
          }
        })
        .catch((error) => {
          response.status(500).send(error);
        });
    } catch (error) {
      console.log(error);
      response.sendStatus(403);
    }
  });

  app.get(
    "/user",
    passport.authenticate("jwt", { session: false }),
    async (
      request: IGetUserAuthInfoRequest,
      response: Response,
      next: NextFunction
    ) => {
      if (request.user.role === UserRole.ADMIN) {
        await getRepository(User)
          .find()
          .then((users) => {
            users.forEach((item) => delete item["password"]);
            response.set({
              "Access-Control-Expose-Headers": "Content-Range",
              "Content-Range": `X-Total-Count: ${1} - ${users.length} / ${
                users.length
              }`,
            });
            response.status(200).json(users);
          })
          .catch((error) => {
            response.status(500).send(error);
          });
      } else {
        var user = await getRepository(User).findOneOrFail({
          where: { id: request.user.id },
        });
        response.status(200).json(user);
      }
    }
  );
  app.put(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    async (request: IGetUserAuthInfoRequest, response: Response) => {
      var user = new User();
      try {
        user = await getRepository(User).findOneOrFail(request.params.id);
        user = { ...user, ...request.body };
        getRepository(User)
          .save(user)
          .then((user) => {
            response.status(201).send(user);
          })
          .catch((error) => {
            response.status(400).send(error);
          });
      } catch (error) {
        response.status(400).send(error);
      }
    }
  );

  app.get(
    "/user/:id",
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    async (request: IGetUserAuthInfoRequest, response: Response) => {
      var user = new User();
      try {
        user = await getRepository(User).findOneOrFail(request.params.id);
        response.status(200).send(user);
      } catch (error) {
        response.status(400).send(error);
      }
    }
  );

  app.post(
    "/user/createadmin",
    passport.authenticate("jwt", { session: false }),
    AdminCheck,
    async (req: IGetUserAuthInfoRequest, res: Response) => {
      const id = req.body.id;
      try {
        const user = await getRepository(User).findOneOrFail({
          where: { id: Number(id) },
        });
        user.role = UserRole.ADMIN;
        await getRepository(User).save(user);
        return res.status(204).json({ message: "Action Successful" });
      } catch (err) {
        return res.status(400).json({
          message: `Failed to find user with id: ${req.body.id}`,
        });
      }
    }
  );
};
