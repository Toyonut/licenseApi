'use strict';

const pgp = require('pg-promise')();
const PQ = require('pg-promise').ParameterizedQuery;
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFileAsync = util.promisify(fs.readFile);

const db = pgp(process.env.DATABASE_URL);

writeRecordsAsync();

async function writeRecordsAsync () {
  try {
    const inputFilePath = path.join('data', 'additional_license_info.json');

    const fileContents = await readFileAsync(inputFilePath);

    const jsonDataArray = JSON.parse(fileContents);

    jsonDataArray.licenses.forEach(async jsonData => {
      const fields = {
        description: jsonData.description,
        permissions: jsonData.permissions,
        conditions: jsonData.conditions,
        limitations: jsonData.limitations,
        id: jsonData.id
      };

      console.dir(fields);
      insertOneRecordAsync(fields);
    });
  } catch (error) {
    console.error(`error fetching web content:\n${error}`);
  }
}

async function insertOneRecordAsync (licenseData) {
  const insertStatement = new PQ(`UPDATE licenseinfo
  SET description = $1,
      permissions = $2,
      conditions = $3,
      limitations = $4
  WHERE id = $5
  RETURNING id`,
  [licenseData.description, licenseData.permissions, licenseData.conditions, licenseData.limitations, licenseData.id]);

  try {
    const result = await db.one(insertStatement);
    console.log(`ID of inserted record: ${result.id}`);
  } catch (error) {
    console.error(`error inserting into DB:\n${error}`);
  }
}
