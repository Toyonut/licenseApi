drop table if exists license_info;

CREATE TABLE If NOT EXISTS license_info (
  id serial PRIMARY KEY,
  license_name varchar(45) not null,
  license_text TEXT not null,
  license_url varchar(200) not null,
  license_short_name varchar(40)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nodeuser;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nodeuser;
