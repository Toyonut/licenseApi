DROP TABLE IF EXISTS licenseinfo;

CREATE TABLE IF NOT EXISTS LicenseInfo (
  id VARCHAR(40) PRIMARY KEY,
  name VARCHAR(100) not null,
  licensetext TEXT not null,
  url VARCHAR(200) not null,
  description TEXT,
  permissions VARCHAR(200) [],
  conditions VARCHAR(200) [],
  limitations VARCHAR(200) []
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO nodeuser;

GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO nodeuser;
