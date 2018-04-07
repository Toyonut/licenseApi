# licenseApi

An API to retrieve licenses for your project.

## What is it?

Simple express API with a postgres DB backend to store the license information. Might eventually convert it to a sqlite DB and run it all in a single container or maybe set it up as a pair of docker containers or something.

The idea is that there could be simple command line apps to make a fetch a license for an existing project, or project generatorscould call the license api and include a license as part of project generation.

## How to run a dev server?

* Requires:
  1. NodeJS > version 8.
  2. a PostgreSQL instance.

* Run the three scripts in the SQL folder against your postgres instance.
  1. `sudo su postgres` - login as the postgres user.
  2. Make sure the password you set in the createNodeUser script matches the one in config/dbConfig.json.
  3. `psql -a -f 001createNodeUser.sql` - create the node user.
  4. `psql -a -f 002createDB.sql` - create the database.
  5. `psql -d licensedata -a -f 003createTable.sql` - create the table and schema in the new database.
* run the scraper to pull the license data from https://choosealicense.com/.
  1. `node tools/scraper.js` - scrapes the data and puts it into the postgres table.
* start a development server and test.
  1. `npm run dev` - start the development server on port 3000.
  2. use curl, powershell, insomnia, postman or any other tool to check it is running and sending data.
  3. Open http://localhost:3000 to get an index of licenses and a url for each.
  4. Open one of the URLs and get back the license text and some other info about it.

## How could it be used by users?

* Bash and Python:

  ``` bash
  curl -s 'http://localhost:3000/license/apache-2.0' | \
  python3 -c "import sys, json; print(json.load(sys.stdin)['license_text'])" > LICENSE.md
  ```

* Powershell:

  ``` powershell
  invoke-restmethod -uri 'http://localhost:3000/license/apache-2.0' |
  select-object -expandproperty license_text |
  out-file LICENSE.md
  ```

* Integrated with tooling. For example, `NPM init` could pull down the relevent license during the init process.
