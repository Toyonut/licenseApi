ALTER TABLE license_info
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS permissions VARCHAR(200) [],
ADD COLUMN IF NOT EXISTS conditions VARCHAR(100) [],
ADD COLUMN IF NOT EXISTS limitations VARCHAR(100) [];