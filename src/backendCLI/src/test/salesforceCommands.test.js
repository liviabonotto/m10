const fs = require('fs');
const path = require('path');
const jsforce = require('jsforce');
const { conn, loginToSalesforce, downloadData, compareData } = require('../commands/salesforceCommands');
const xml2js = require('xml2js');

jest.mock('jsforce');
jest.mock('fs');
jest.mock('xml2js');

describe('Salesforce Data Operations', () => {
  let req, res, connMock, queryResult;

  beforeAll(() => {
    connMock = new jsforce.Connection();
    jsforce.Connection.mockImplementation(() => connMock);
    queryResult = {
      records: [
        { Id: '001', Name: 'Account 1', LastModifiedDate: '2023-01-01T00:00:00Z' },
        { Id: '002', Name: 'Account 2', LastModifiedDate: '2023-01-02T00:00:00Z' }
      ],
    };
  });

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    // Mock login method
    connMock.login.mockImplementation(async () => {
      connMock.userInfo = {
        id: '0051g000000tQjUAAU',
        organizationId: '00D1g0000008F5HEAU',
      };
      return {
        id: '0051g000000tQjUAAU',
        organizationId: '00D1g0000008F5HEAU',
      };
    });

    connMock.query = jest.fn().mockResolvedValue(queryResult);

    fs.writeFileSync.mockReset();
    fs.readFileSync.mockReset();
    fs.existsSync.mockReset();
    res.status.mockClear();
    res.send.mockClear();
    res.json.mockClear();
  });

  describe('compareData', () => {
    it('should compare Salesforce data with local data and return differences', async () => {
      const salesforceXmlData = `
        <records>
          <record>
            <Id>001</Id>
            <Name>Account 1</Name>
            <LastModifiedDate>2023-01-01T00:00:00Z</LastModifiedDate>
          </record>
        </records>`;
      const localXmlData = `
        <records>
          <record>
            <Id>002</Id>
            <Name>Account 2</Name>
            <LastModifiedDate>2023-01-02T00:00:00Z</LastModifiedDate>
          </record>
        </records>`;

      fs.existsSync.mockReturnValue(true);
      fs.readFileSync.mockImplementation((filePath) => {
        if (filePath.includes('salesforce_data.xml')) {
          return salesforceXmlData;
        }
        return localXmlData;
      });

      xml2js.Parser.mockImplementation(() => ({
        parseStringPromise: jest.fn((xml) => {
          if (xml.includes('Account 1')) {
            return Promise.resolve({
              records: {
                record: [
                  { Id: ['001'], Name: ['Account 1'], LastModifiedDate: ['2023-01-01T00:00:00Z'] }
                ]
              }
            });
          } else {
            return Promise.resolve({
              records: {
                record: [
                  { Id: ['002'], Name: ['Account 2'], LastModifiedDate: ['2023-01-02T00:00:00Z'] }
                ]
              }
            });
          }
        })
      }));

      await compareData(req, res);

      expect(res.json).toHaveBeenCalledWith([
        { Id: ['001'], Name: ['Account 1'], LastModifiedDate: ['2023-01-01T00:00:00Z'] }
      ]);
    });

    it('should handle missing files', () => {
      fs.existsSync.mockReturnValue(false);

      req.body = {}; // simulate empty request body

      compareData(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Both Salesforce data and local data files must exist.');
    });
  });
});

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
