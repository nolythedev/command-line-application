const fs = require("fs");
const path = require('path');
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");
const licenses = require("./utils/licenses")

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
        type: "confirm",
        name: "has_license",
        message: "Would you like to add a license to your project?",
    },
    {
        type: "rawlist",
        name: "license",
        message: "Please select a license for your project:",
        choices: ['Apache', 'Creative Commons', 'Eclipse', "IBM", "MIT"]
    },
];


// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    //for of loop through questions
    //inquirer.prompt(questions)

    inquirer.prompt(questions)
        .then(answers => {
            console.log(answers);
        })

}

// function call to initialize program
init();
