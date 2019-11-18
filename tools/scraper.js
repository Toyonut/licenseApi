'use strict';

const rp = require('request-promise');
const cheerio = require('cheerio');
const pgp = require('pg-promise')();
const PQ = require('pg-promise').ParameterizedQuery;
const licenses = require('./licenses');
require('dotenv').config();

const db = pgp(process.env.DATABASE_URL);

(async () => {
  try {
    const urls = await licenses.GetLicenses();

    urls.forEach(async url => {
      const webContent = await GetWwebContent(url);

      const fields = {
        name: webContent('h1').text(),
        licenseText: webContent('#license-text').text(),
        url: url,
        licenseShortName: getShortName(url)
      };

      console.log(fields);
      insertOneRecordAsync(fields);
    });
  } catch (error) {
    console.error(`error fetching web content:\n${error}`);
  }
})();

async function GetWwebContent (url) {
  const options = {
    uri: url,
    transform: body => {
      return cheerio.load(body);
    }
  };

  try {
    const webReq = await rp(options);
    return webReq;
  } catch (error) {
    console.error(`error fetching web content:\n${error}`);
  }
}

async function insertOneRecordAsync (licenseData) {
  const insertStatement = new PQ(
    `INSERT INTO LicenseInfo(id, name, licensetext, url)
    VALUES($1, $2, $3, $4) RETURNING id`);

  insertStatement.values = [
    licenseData.id,
    licenseData.name,
    licenseData.licenseText,
    licenseData.url
  ];

  try {
    const result = await db.one(insertStatement);
    console.log(`ID of inserted record: ${result.id}`);
  } catch (error) {
    console.error(`error inserting into DB:\n${error}`);
  }
}

const getShortName = (licenseUrl) => {
  const url = licenseUrl.toLowerCase();
  const urlSegments = url.split('/');

  const licencesIndex = urlSegments.indexOf('licenses');
  const licenseNameIndex = licencesIndex + 1;

  const licenseShortName = urlSegments[licenseNameIndex];
  return licenseShortName;
};
