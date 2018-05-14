drop user if exists nodeuser;

CREATE USER nodeuser
  WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE;

ALTER USER nodeuser
	PASSWORD 'password';


