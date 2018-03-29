drop user if exists nudeuser;

CREATE USER nodeuser
  WITH
  LOGIN
  NOSUPERUSER
  INHERIT
  NOCREATEDB
  NOCREATEROLE;

ALTER USER nodeuser
	PASSWORD 'password';


