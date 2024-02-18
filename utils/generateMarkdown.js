// function to generate markdown for README
function generateMarkdown(data) {
  return `

  ${data.badge}
  
  # ${data.title}

  ## Description

  ${data.description}

  ## Table of contents

  * [Installation](#installation)
  * [Usage](#usage)
  * [Credits](#credits)
  * [License](#license)

  ## Installation

  ${data.installation}

  ## Usage

  ${data.usage}

  ## Contributing

  ${data.contribution}

  ## Tests

  ${data.contribution}

  ## Questions
  ${data.user}
`;
}

module.exports = generateMarkdown;
