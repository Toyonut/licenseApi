drop user if exists nosdeuser;

CREATE USER nodeuser
  WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE;

ALTER USER nodeuser
	PASSWORD 'password';


