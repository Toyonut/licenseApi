# licenseApi

An API to retrieve licenses for your project.

## What is it

Simple express API with a postgres DB backend to store the license information. Might eventually convert it to a sqlite DB and run it all in a single container or maybe set it up as a pair of docker containers or something.

The idea is that there could be simple command line apps to make a fetch a license for an existing project, or project generators could call the license api and include a license as part of project generation.

## How to run a dev server

* Requires:
  1. NodeJS > version 8.
  2. a PostgreSQL instance.

* Run the three scripts in the SQL folder against your postgres instance.
  1. Make sure the password you set in the createNodeUser script matches the one in config/dbConfig.json.
  2. `psql -a -U postgres -W -f 001createNodeUser.sql` - create the node user.
  3. `psql -a -U postgres -W-f 002createDB.sql` - create the database.
  4. `psql -d licensedata -U postgres -W -a -f 003createTable.sql` - create the table and schema in the new database.
* you can either run a web scraper or use the json data file to set up the DB data.
  1. run the scraper to pull the license data from https://choosealicense.com/.
    `node tools/scraper.js` - scrapes the data and puts it into the postgres table.
  2. The preferred way would be to run the json_to_db tool.
    s`node tools/json_to_db.js` - uses the json file in `data/full_license_info.json` to populate the database.
* start a development server and test.
  1. `npm run dev` - start the development server on port 3000.
  2. use curl, powershell, insomnia, postman or any other tool to check it is running and sending data.
  3. Get http://localhost:3000/license to get an index of licenses and a url for each.
  4. Get http://localhost:3000/license/:license_name: to get the individual license text and details.
  5. Get parameters like http://localhost:3000/license/:license_name:?name=:your_name:&email=:your_email: can be used to populate the email and fullName fields in the license text.

## How could it be used by users

* Bash and Python:

  ``` bash
  curl -s 'http://localhost:3000/license/mit' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['license_text'])" > LICENSE.md
  ```

* Powershell:

  ``` powershell
  invoke-restmethod -uri 'http://localhost:3000/license/apache-2.0' |
  select-object -expandproperty license_text |
  out-file LICENSE.md
  ```

* Node/JS:

  ```Javascript
  const https = require('https')
  const fs = require('fs')

  let licenseUrl = 'https://os-license-api.herokuapp.com/license/mit'

  https.get(licenseUrl, res => {
    let apiData = []

    res.on('data', (dataChunk) => {
      apiData.push(dataChunk)
    })

    res.on('end', () => {
      let data = JSON.parse(apiData.join(''))
      try {
        fs.writeFileSync('./license.md', data.licenseText)
      } catch (err) {
        console.error(err)
      }
    })
  })
  ```

* Integrated with tooling. For example, `NPM init` could pull down the relevent license during the init process.
