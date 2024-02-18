// function to generate markdown for README
const licenses = require("./licenses");

function generateMarkdown(data) {
  const selectedLicense = data.license.toLowerCase();

    // Retrieve the license details based on the selected license
  const { badge, title, coverage } = licenses[selectedLicense];

  return `

  ${badge} 
  
  # ${data.title}

  ## Description

  ${data.description}

  ## Table of contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)

  ## Installation

  ${data.instructions.split(',').map(instruction => `\t* ${instruction.trim()}`).join('\n')}

  ## Usage

  ${data.usage}

  ## Contributing

  ${data.has_contribution ? data.contribution : 'No contribution guidelines provided.'}

  ## Tests

  ${data.has_tests ? data.tests : 'No test instructions provided.'}

  ## License

  ${title} <br>
  ${coverage}

  ## Questions

  For any additional questions, please contact me below: <br>
  ${data.user_email} <br>
  [GitHub Profile](https://github.com//${data.user})
`;
}

module.exports = generateMarkdown;
