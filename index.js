const render = require("./src/page-template.js");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");


const teamMembers = [];
const members = [];


function teamBuilder() {

  function createManager() {
    inquirer.prompt([
      {
        type: "input",
        name: "managerName",
        message: "What is the team manager's name?",
      },
      {
        type: "input",
        name: "managerId",
        message: "What is the team manager's id?",
      },
      {
        type: "input",
        name: "managerEmail",
        message: "What is the team manager's email?",
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "What is the team manager's office number?",
      }
    ]).then(answers => {
      const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
      teamMembers.push(manager);
      members.push(answers.managerId);
      generateTeam();
    });
  }


  function generateTeam() {

    inquirer.prompt([
      {
        type: "list",
        name: "memberChoice",
        message: "Which type of team member would you like to add?",
        choices: [
          "Engineer",
          "Intern",
          "I don't want to add any more team members"
        ]
      }
    ]).then(userChoice => {
      if (userChoice.memberChoice == "Engineer") {
        console.log('engineer');
        addEngineer();
      } else if (userChoice.memberChoice == 'Intern') {
        console.log('intern')
        addIntern();
      } else {
        buildTeam()
      }
    })


    function addEngineer() {
      inquirer.prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is your engineer's name?",
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is your engineer's id?",
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is your engineer's email?",
        },
        {
          type: "input",
          name: "engineerGithub",
          message: "What is your engineer's GitHub username?",

        }
      ]).then(answers => {
        const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        teamMembers.push(engineer);
        members.push(answers.engineerId);
        generateTeam();
      });
    }

    function addIntern() {
      inquirer.prompt([
        {
          type: "input",
          name: "internName",
          message: "What is your intern's name?",

        },
        {
          type: "input",
          name: "internId",
          message: "What is your intern's id?",
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is your intern's email?",
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is your intern's school?",
        }
      ]).then(answers => {
        const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        teamMembers.push(intern);
        members.push(answers.internId);
        generateTeam();
      });
    }

    function buildTeam() {
      // Create the output directory if the output path doesn't exist
      if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
      }
      fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }


  }

  createManager();

}

teamBuilder();