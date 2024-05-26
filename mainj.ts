#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";

let user = await inquirer.prompt([
  {
    name: "input",
    type: "number",
    message: ("\nPlease Enter Seconds under 60\n"),
    validate: (input) => {
      if (input === isNaN) {
        return (`\n Please Input Valid Seconds\n`);
      } else if (input > 60) {
        return (`\n Seconds Must be under 60\n`);
      } else {
        return true;
      }
    },
  },
]);

let value = user.input;
async function Timer(value: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + value);
  const intervalTime = new Date(intTime);
  await new Promise(() => {
    setInterval(() => {
      const currentTime = new Date();
      const time_Difference = differenceInSeconds(intervalTime, currentTime);

      if (time_Difference <= 0) {
        console.log("\n\nYour Timer has completed\n\nThank you for using");
        process.exit();
      }
      const minutes = Math.floor((time_Difference % (3600 * 24)) / 3600);
      const seconds = Math.floor(time_Difference % 60);

      setTimeout(() => {
        console.log(
          `${minutes.toString().padStart(1, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`
        );
      });
    }, 1000);
  });
}
await Timer(value);
