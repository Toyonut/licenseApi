DROP TABLE IF EXISTS license_info;

CREATE TABLE IF NOT EXISTS license_info (
  id SERIAL PRIMARY KEY,
  license_name VARCHAR(100) not null,
  license_text TEXT not null,
  license_url VARCHAR(200) not null,
  license_short_name VARCHAR(40)
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nodeuser;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nodeuser;
