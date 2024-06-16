const { loginToSalesforce, conn } = require('./salesforceConnection');

loginToSalesforce()
  .then(() => {
    // Optionally, query Salesforce to verify the connection further
    conn.query("SELECT Id, Name FROM Account LIMIT 1", function(err, result) {
      if (err) {
        console.error('Query error: ', err);
      } else {
        console.log('Query result: ', result);
      }
    });
  })
  .catch(err => {
    console.error('Salesforce login error: ', err);
  });
