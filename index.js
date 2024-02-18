const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const ora = require("ora");
const generateMarkdown = require("./utils/generateMarkdown");
const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function checkEmpty(input) {
    if (input.trim() === "") {
        return "Please give a response";
    } else if (input.length <= 2) {
        return "Please enter a valid response";
    } else {
        return true; // Input passes validation
    }
}


// array of questions for user
const questions = [
    {
        type: "input",
        name: "user",
        message: "Enter your GitHub username:",
        validate: function (input) {
            if (input.trim() === "") {
                return "Username cannot be empty";
            } else if (input.length <= 2) {
                return "Please enter a valid user name";
            } else {
                return true; // Input passes validation
            }
        }
    },
    {
        type: "input",
        name: "user_email",
        message: "Enter your email address:",
        validate: function (input) {
            if (regex.test(input)) {
                return true; // Input passes validation
            } else {
                return "Please enter a valid email address"; // Input fails validation
            }
        }
    },
    {
        type: "input",
        name: "title",
        message: "Give your project a title:",
        validate: checkEmpty
    },
    {
        type: "input",
        name: "description",
        message: "Give your project a short description:",
        validate: checkEmpty
    },
    {
        type: "input",
        name: "instructions",
        message: "Give your project some installation instructions",
        suffix: " <separate multiple instructions with a comma> :",
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
        suffix: " <separate multiple contributions with a comma> :",
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
        suffix: " <separate multiple test instructions with a comma> :",
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
