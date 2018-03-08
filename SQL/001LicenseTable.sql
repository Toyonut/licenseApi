CREATE DATABASE licensedata
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  LC_COLLATE = 'English_United States.1252'
  LC_CTYPE = 'English_United States.1252'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;

CREATE USER nodeuser WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE

CONNECT licensedata

CREATE TABLE If NOT EXISTS license_info (
  id serial PRIMARY KEY,
  license_name varchar(45) not null,
  license_text TEXT not null,
  license_url varchar(200) not null,
  ADD COLUMN license_short_name varchar(40)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nodeuser;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nodeuser;
