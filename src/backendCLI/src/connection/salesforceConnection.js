const jsforce = require('jsforce');
require('dotenv').config(); 


const SF_USERNAME = process.env.SF_USERNAME;
const SF_PASSWORD = process.env.SF_PASSWORD;
const SF_SECURITY_TOKEN = process.env.SF_SECURITY_TOKEN;
const SF_LOGIN_URL = process.env.SF_LOGIN_URL;


const conn = new jsforce.Connection({
  loginUrl: SF_LOGIN_URL
});


const loginToSalesforce = async () => {
  console.log('Checking credentials:');
  console.log('Username:', SF_USERNAME ? 'Provided' : 'Not Provided');
  console.log('Password:', SF_PASSWORD ? 'Provided' : 'Not Provided');
  console.log('Security Token:', SF_SECURITY_TOKEN ? 'Provided' : 'Not Provided');
  console.log('Login URL:', SF_LOGIN_URL ? SF_LOGIN_URL : 'Not Provided');

  if (!SF_USERNAME || !SF_PASSWORD || !SF_SECURITY_TOKEN || !SF_LOGIN_URL) {
    console.error('Missing one or more required environment variables.');
    process.exit(1);
  }

 
  try {
    await conn.login(SF_USERNAME, SF_PASSWORD + SF_SECURITY_TOKEN);
    console.log('Salesforce login successful');
    console.log('User Info:', conn.userInfo);
    console.log('User ID: ', conn.userInfo.id);
    console.log('Org ID: ', conn.userInfo.organizationId);
    return conn;
  } catch (err) {
    console.error('Salesforce login error: ', err.message);
    throw err;
  }
};

module.exports = {
  conn,
  loginToSalesforce
};
