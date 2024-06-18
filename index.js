const fs = require('fs');
const path = require('path');
const SwaggerParser = require('swagger-parser');

// Path to your Swagger/OpenAPI specification file
const specPath = 'spec_file/petstore.json';
const distPath = 'dist/';
const outputFilename = 'petstore.js'; // Output filename

// Parse the specification
SwaggerParser.parse(specPath)
  .then(api => {
    // Access the parsed API definition
    console.log('Parsed API:', api);

    // Generate JavaScript client code
    const clientCode = generateClientCode(api);

    // Write the client code to a file
    const outputPath = path.join(distPath, outputFilename);
    fs.writeFileSync(outputPath, clientCode, 'utf8');
    console.log('Client code saved to', outputPath);
  })
  .catch(err => {
    console.error('Error parsing API:', err);
  });

// Function to generate client code
function generateClientCode(api) {
  let clientCode = '';

  // Generate code for each path/endpoint
  for (const [path, pathObj] of Object.entries(api.paths)) {
    for (const [method, methodObj] of Object.entries(pathObj)) {
      const operationId = methodObj.operationId;
      clientCode += `// ${method} ${path}\n`;
      clientCode += `function ${operationId}() {\n`;
      clientCode += `  // Implement ${operationId} here\n`;
      clientCode += `}\n\n`;
    }
  }

  return clientCode;
}
