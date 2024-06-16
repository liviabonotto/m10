const { loginToSalesforce } = require('../connection/salesforceConnection'); 

describe('Salesforce Integration Tests', () => {
  it('should log in to Salesforce successfully', async () => {
    expect.assertions(1);
    
    try {
      const conn = await loginToSalesforce();
      expect(conn.userInfo).toHaveProperty('id');
    } catch (err) {
      throw new Error('Failed to log in to Salesforce');
    }
  });
});

