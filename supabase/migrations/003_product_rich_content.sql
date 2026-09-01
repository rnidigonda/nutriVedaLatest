-- ============================================================
-- Add rich content columns to products
-- how_to_use, ingredients, storage_info + tagline
-- ============================================================

ALTER TABLE products ADD COLUMN IF NOT EXISTS tagline TEXT;             -- fancy short subtitle
ALTER TABLE products ADD COLUMN IF NOT EXISTS how_to_use TEXT;         -- usage instructions
ALTER TABLE products ADD COLUMN IF NOT EXISTS ingredients TEXT;        -- ingredient list (comma text)
ALTER TABLE products ADD COLUMN IF NOT EXISTS storage_info TEXT;       -- storage + shelf life
ALTER TABLE products ADD COLUMN IF NOT EXISTS shelf_life TEXT;         -- e.g. "6 Months"
