import nodeCron = require("node-cron");
import StreamTransport = require("nodemailer/lib/stream-transport");
import { getManager, getRepository } from "typeorm";
import { Stats } from "./entity/Stats";
import { User } from "./entity/User";

export const minuteJob = nodeCron.schedule(
  "* * * * *",
  function () {
    console.log("running a task every minute");
  },
  {
    scheduled: false,
  }
);

export const dayJob = nodeCron.schedule(
  "0 0 * * *",
  async function () {
    console.log("running a task every day");

    await getManager()
      .transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager
          .getRepository(Stats)
          .findOne()
          .then(async (stat) => {
            stat.breakfast_day_no = 0;

            stat.lunch_day_no = 0;

            stat.din_day_no = 0;

            stat.sn_day_no = 0;

            await transactionalEntityManager.save(stat);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  },
  {
    scheduled: false,
  }
);

export const monthJob = nodeCron.schedule(
  "0 0 1 * *",
  async function () {
    console.log("running a task every month");
    await getManager()
      .transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager
          .getRepository(User)
          .find()
          .then(async (users) => {
            users.map(async (user) => {
              user.break_no = 20;
              user.lunch_no = 20;
              user.din_no = 20;
              user.sn_no = 20;

              await transactionalEntityManager.save(user);
            });
          })

          .catch((error) => {
            console.error(error);
          });
        await transactionalEntityManager
          .getRepository(Stats)
          .findOne()
          .then(async (stat) => {
            stat.breakfast_month_no = 0;

            stat.lunch_month_no = 0;

            stat.din_month_no = 0;

            stat.sn_month_no = 0;

            await transactionalEntityManager.save(stat);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  },
  {
    scheduled: false,
  }
);

export const yearJob = nodeCron.schedule(
  "0 0 1 1 *",
  async function () {
    console.log("running a task every year");
    await getManager()
      .transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager
          .getRepository(Stats)
          .findOne()
          .then(async (stat) => {
            stat.breakfast_yearly_no = 0;

            stat.lunch_yearly_no = 0;

            stat.din_yearly_no = 0;

            stat.sn_yearly_no = 0;

            await transactionalEntityManager.save(stat);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  },
  {
    scheduled: false,
  }
);

const allow = (id: number) => {
  return new Promise<Boolean>(async (resolve) => {
    try {
        console.log("hi");
        
      getRepository(User)
        .findOne({ id: id })
        .then(async (user) => {
          user.codeBlock = false;
          await getRepository(User).save(user);
        })
        .then(() => resolve(true))
        .catch((err) => {
          throw err;
        });
    } catch (err) {
      console.log(err);
    }
  });
};

export function scheduler(id: number) {
  console.log(id);

  setTimeout(async() => await allow(id), 5400000);
}
