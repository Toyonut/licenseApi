DROP DATABASE IF EXISTS licensedata;

CREATE DATABASE licensedata
  WITH
  OWNER = postgres
  ENCODING = 'UTF8'
  TABLESPACE = pg_default
  CONNECTION LIMIT = -1;
