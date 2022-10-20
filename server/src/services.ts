import { customRandom, random, urlAlphabet } from "nanoid";
const nanoid = customRandom(urlAlphabet, 10, random);
var bcrypt = require("bcryptjs");

export const passwordhasher = (password: string) => {
  return new Promise<string>(async (resolve) => {
    await bcrypt.genSalt(10, async function (err: Error, salt: string) {
      if (err) console.log("ff "+err) //throw err;
      await bcrypt.hash(
        password,
        salt,
        async function (err: Error, hash: string) {
          if (err) {
            console.log(err);
            
            //throw err;
          }
          resolve(hash);
        }
      );
    });
  });
};
