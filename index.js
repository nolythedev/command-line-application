const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const ora = require("ora");
const generateMarkdown = require("./utils/generateMarkdown");

// array of questions for user
const questions = [
    {
        type: "input",
        name: "user",
        message: "Enter your GitHub username:",
    },
    {
        type: "input",
        name: "title",
        message: "Give your project a title:",
    },
    {
        type: "input",
        name: "description",
        message: "Give your project a short description:",
    },
    {
        type: "input",
        name: "instructions",
        message: "Give your project some installation instructions:",
    },
    {
        type: "confirm",
        name: "has_contribution",
        message: "Would you like to add contribution guidelines?",

    },
    {
        type: "input",
        name: "contribution",
        message: "Give your project some contribution guidelines:",
        when: (answers) => answers.has_contribution === true
    },
    {
        type: "confirm",
        name: "has_tests",
        message: "Would you like to add test instructions?",

    },
    {
        type: "input",
        name: "tests",
        message: "Give your project some test instructions:",
        when: (answers) => answers.has_tests === true
    },
    {
        type: "rawlist",
        name: "license",
        message: "Please select a license for your project:",
        choices: ['Apache', 'Creative Commons', 'Eclipse', "IBM", "MIT"],
        default: "MIT",
    },
];


// function to write README file
function writeToFile(fileName, data) {
    const spinner = ora({
        spinner: 'hearts',
        text: 'Creating your README file...'
    }).start();

    setTimeout(() => {
        fs.writeFile(fileName, data, err => {
            if (err) {
                console.error(err);
                spinner.fail('Failed to write file');
            } else {
                spinner.succeed('File written successfully');
            }
        });
    }, 3000);
}

// function to initialize program
function init() {
    inquirer.prompt(questions)
        .then(answers => {
            const markdown = generateMarkdown(answers);
            writeToFile('README.md', markdown);
        })
        .catch(error => {
            console.error(error);
        });
}

// function call to initialize program
init();
