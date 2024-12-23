// filepath: /c:/WS/PlantWater/scripts/set-env.ts
const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const targetPath = `./src/environments/environment.ts`;

// Define environment variables to be injected
const envConfigFile = `
export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: '${process.env["PLANTWATER_FIREBASE_API_KEY"]}',
    authDomain: 'plantwater-f986c.firebaseapp.com',
    projectId: 'plantwater-f986c',
    storageBucket: 'plantwater-f986c.firebasestorage.app',
    messagingSenderId: '873827710935',
    appId: '1:873827710935:web:d7170b165186550ff7fd92'
  }
};
`;
  
if(!existsSync(targetPath)){
  mkdirSync("./src/environments/");
}
// Write the environment variables to the environment.ts file
writeFile(targetPath, envConfigFile, function (err) {
  
  if (err) {
    console.log(err);
  } else {
    console.log(`Environment variables written to ${targetPath}`);
  }
});