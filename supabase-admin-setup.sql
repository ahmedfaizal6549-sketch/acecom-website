-- ============================================================
-- ACECOM ADMIN SETUP SQL
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. CREATE PRODUCTS TABLE (if it doesn't exist)
CREATE TABLE IF NOT EXISTS products (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  category    TEXT NOT NULL,
  brand       TEXT NOT NULL,
  price       NUMERIC NOT NULL,
  old_price   NUMERIC,
  image       TEXT,
  description TEXT,
  specs       JSONB,
  featured    BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ENABLE ROW LEVEL SECURITY
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- 3. ALLOW PUBLIC READ (so your website can show products)
CREATE POLICY "Public can read products"
  ON products FOR SELECT
  USING (true);

-- 4. ALLOW AUTHENTICATED USERS TO WRITE (so admin dashboard can add/edit/delete)
CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- 5. DONE!
-- Now go to your admin dashboard and click "Seed Products"
-- OR run the insert statements below manually:

/*
INSERT INTO products (id, name, category, brand, price, old_price, image, description, featured) VALUES
(1, 'ASUS ROG Strix G16', 'gaming', 'ASUS', 372000, 410000, 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=400&fit=crop', 'Dominate the battlefield with cutting-edge hardware.', true),
(2, 'HP Victus 15-fa1082wm', 'gaming', 'HP', 281000, 315000, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop', 'Performance and affordability for gamers.', false)
-- ... add more as needed
ON CONFLICT (id) DO NOTHING;
*/
