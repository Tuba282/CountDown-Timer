#! /usr/bin/env node
import inquirer from "inquirer";
import ora from "ora";
import chalk from "chalk";
import { differenceInSeconds } from "date-fns";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
async function Welcome() {
    await new Promise((resolve) => {
        figlet.text("Presenting CountDown Timer", { font: "Slant" }, function (err, data) {
            if (err) {
                console.dir("oops something went wrong");
                console.log(err);
            }
            let animate = chalkAnimation.rainbow(data);
            setTimeout(() => {
                resolve(animate.stop());
            }, 3000);
        });
    });
}
await Welcome();
let user = await inquirer.prompt([
    {
        name: "input",
        type: "number",
        message: chalk.blueBright("\nPlease Enter Seconds under 60\n"),
        validate: (input) => {
            if (input === isNaN) {
                return chalk.red(`\n Please Input Valid Seconds\n`);
            }
            else if (input > 60) {
                return chalk.red(`\n Seconds Must be under 60\n`);
            }
            else {
                return true;
            }
        },
    },
]);
let value = user.input;
let little_spinner = ora("\n\nCounting Down.....\n\n").start();
async function make_ora() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(little_spinner.succeed("\n\nYour Timer Begins....\n\n").stop());
        }, 2000);
    });
}
await make_ora();
async function Timer(value) {
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
                console.log(chalk.blue(`${minutes.toString().padStart(1, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`));
            });
        }, 1000);
    });
}
await Timer(value);
