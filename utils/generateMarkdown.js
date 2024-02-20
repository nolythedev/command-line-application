// function to generate markdown for README
const licenses = require("./licenses");

/* 
${data.instructions.includes(',') ? - checks if instructions incldue a comma

data.instructions.split(',') - splits the instructions by the comma and adds them to an array ["ex1", "ex2", "ex3"]

.map(instruction => `* ${instruction.trim()}`) - .map iterates over each element in the array and the function takes each element, trims any leading space then adds an asterisk to the prefix 

.join('\n') - joins the array elements back into a single string with newline characters (\n) separating each element "ex1, ex2, ex3"

*/

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
  * [Contributing](#contributing)
  * [License](#license)
  * [Tests](#tests)
  * [Questions](#questions)

  ## Installation

${data.instructions.includes(',') ?
      data.instructions.split(',').map(instruction => `* ${instruction.trim()}`).join('\n') :
      `* ${data.instructions.trim()}`
    }

## Usage

${data.has_usage ?
      (data.usage.includes(',') ?
        data.usage.split(',').map(use => `* ${use.trim()}`).join('\n') :
        `* ${data.usage.trim()}`
      ) :
      'No usage instructions provided.'
    }

## Contributing

${data.has_contribution ? 
      (data.contribution.includes(',') ?
        data.contribution.split(',').map(contribute => `* ${contribute.trim()}`).join('\n') :
        `* ${data.contribution.trim()}`
      ) :
      'No contribution guidelines provided.'
    }

## Tests

${data.has_tests ?
      (data.tests.includes(',') ?
        data.tests.split(',').map(test => `* ${test.trim()}`).join('\n') :
        `* ${data.tests.trim()}`
      ) :
      'No test instructions provided.'
    }


## License

  ${title}: <br>
  ${coverage}

## Questions

  For any additional questions, please contact me below: <br>
  ${data.user_email} <br>
  [GitHub Profile](https://github.com//${data.user})
`;
}

module.exports = generateMarkdown;
