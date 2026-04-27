-- ============================================================================
-- ACECOM LANKA - SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor > New Query)
-- ============================================================================

-- DROP existing tables and trigger (safe to run multiple times)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user();
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS cart_items CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS products CASCADE;

-- 1. PRODUCTS TABLE
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('gaming', 'business', 'entertainment', 'accessories')),
  brand TEXT NOT NULL,
  price NUMERIC(12,2) NOT NULL,
  old_price NUMERIC(12,2),
  image TEXT,
  description TEXT,
  specs JSONB DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. USER PROFILES (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  address TEXT,
  city TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. CART ITEMS (per user)
CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- 4. ORDERS
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  total NUMERIC(12,2) NOT NULL,
  shipping NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  shipping_name TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_phone TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. ORDER ITEMS
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(12,2) NOT NULL
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products: anyone can read, only service role can insert/update/delete
CREATE POLICY "Products are viewable by everyone" ON products FOR SELECT USING (true);

-- Profiles: users can read and update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Cart: users can manage their own cart
CREATE POLICY "Users can view own cart" ON cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can add to own cart" ON cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart" ON cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete from own cart" ON cart_items FOR DELETE USING (auth.uid() = user_id);

-- Orders: users can view their own orders
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items: users can view items from their own orders
CREATE POLICY "Users can view own order items" ON order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));
CREATE POLICY "Users can insert own order items" ON order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- ============================================================================
-- AUTO-CREATE PROFILE ON SIGNUP (trigger)
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- SEED DATA - 16 Products
-- ============================================================================

INSERT INTO products (id, name, category, brand, price, old_price, image, description, specs, featured) VALUES
(1, 'ASUS ROG Strix G16', 'gaming', 'ASUS', 372000, 410000, 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=500&h=400&fit=crop', 'Dominate the battlefield with the ASUS ROG Strix G16. Engineered for peak gaming performance with cutting-edge hardware and immersive display technology.', '{"Processor":"Intel Core i7-13650HX","RAM":"16GB DDR5","Storage":"512GB NVMe SSD","Display":"16\" FHD 165Hz","GPU":"NVIDIA RTX 4060 8GB"}', true),
(2, 'HP Victus 15-fa1082wm', 'gaming', 'HP', 281000, 315000, 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=400&fit=crop', 'Performance and affordability for gamers. The Victus 15 delivers exceptional gaming power without breaking the bank.', '{"Processor":"Intel Core i5-12500H","RAM":"8GB DDR4","Storage":"512GB NVMe SSD","Display":"15.6\" FHD 144Hz","GPU":"NVIDIA RTX 3050 4GB"}', true),
(3, 'Lenovo Yoga 7 2-in-1', 'business', 'Lenovo', 320000, 355000, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop', 'Perfect companion for business professionals with a stunning OLED touchscreen.', '{"Processor":"AMD Ryzen 7 7730U","RAM":"16GB DDR4","Storage":"512GB NVMe SSD","Display":"14\" 2.8K OLED Touch","GPU":"AMD Radeon Integrated"}', true),
(4, 'Dell XPS 15 9530', 'business', 'Dell', 445000, 490000, 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=400&fit=crop', 'Premium performance with a breathtaking 3.5K OLED display.', '{"Processor":"Intel Core i7-13700H","RAM":"16GB DDR5","Storage":"1TB NVMe SSD","Display":"15.6\" 3.5K OLED","GPU":"NVIDIA RTX 4050 6GB"}', true),
(5, 'ASUS Vivobook R1502V', 'entertainment', 'ASUS', 232000, 260000, 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=500&h=400&fit=crop', 'Versatile everyday laptop for work and entertainment.', '{"Processor":"Intel Core i5-1335U","RAM":"8GB DDR4","Storage":"512GB NVMe SSD","Display":"15.6\" FHD IPS","GPU":"Intel Iris Xe"}', true),
(6, 'HP OmniBook 5 Flip', 'business', 'HP', 255000, 280000, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=400&fit=crop', 'Convertible design perfect for presentations and everyday tasks.', '{"Processor":"Intel Core i5-1335U","RAM":"16GB DDR4","Storage":"256GB NVMe SSD","Display":"14\" FHD IPS Touch","GPU":"Intel Iris Xe"}', true),
(7, 'MSI Thin 15 B13VE', 'gaming', 'MSI', 305000, 340000, 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&h=400&fit=crop', 'Serious gaming power in a sleek form factor.', '{"Processor":"Intel Core i7-13620H","RAM":"16GB DDR5","Storage":"512GB NVMe SSD","Display":"15.6\" FHD 144Hz","GPU":"NVIDIA RTX 4050 6GB"}', false),
(8, 'ASUS TUF Gaming FX607V', 'gaming', 'ASUS', 372000, 399000, 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=500&h=400&fit=crop', 'Military-grade durability meets top-tier gaming performance.', '{"Processor":"Intel Core i7-13700H","RAM":"16GB DDR5","Storage":"1TB NVMe SSD","Display":"16\" QHD 165Hz","GPU":"NVIDIA RTX 4060 8GB"}', false),
(9, 'Lenovo IdeaPad Slim 3', 'entertainment', 'Lenovo', 178000, 199000, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&h=400&fit=crop', 'Budget-friendly laptop for streaming and everyday tasks.', '{"Processor":"AMD Ryzen 5 7520U","RAM":"8GB DDR5","Storage":"256GB NVMe SSD","Display":"15.6\" FHD IPS","GPU":"AMD Radeon 610M"}', false),
(10, 'Dell Inspiron 16 5630', 'entertainment', 'Dell', 265000, 295000, 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=400&fit=crop', 'Large-screen entertainment laptop with premium specs.', '{"Processor":"Intel Core i7-1360P","RAM":"16GB DDR5","Storage":"512GB NVMe SSD","Display":"16\" FHD+ IPS","GPU":"Intel Iris Xe"}', false),
(11, 'HP Envy x360 15', 'business', 'HP', 358000, 390000, 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&h=400&fit=crop', 'Premium design meets versatile performance.', '{"Processor":"AMD Ryzen 7 7730U","RAM":"16GB DDR5","Storage":"512GB NVMe SSD","Display":"15.6\" FHD OLED Touch","GPU":"AMD Radeon Integrated"}', false),
(12, 'Armageddon Shield 7 Backpack', 'accessories', 'Armageddon', 8500, 12000, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=400&fit=crop', 'Protect your laptop in style.', '{"Type":"Laptop Backpack","Material":"Water Resistant Polyester","Size":"15.6\" Compatible","Features":"USB Charging Port"}', false),
(13, 'Gaming Mouse RGB Pro', 'accessories', 'Generic', 4500, 6000, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=400&fit=crop', 'Precision gaming mouse with RGB lighting.', '{"Type":"Gaming Mouse","DPI":"16000 DPI","Buttons":"7 Programmable","Connectivity":"Wired USB"}', false),
(14, 'Mechanical Keyboard TKL', 'accessories', 'Generic', 12500, 15000, 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&h=400&fit=crop', 'Compact mechanical keyboard with blue switches.', '{"Type":"Mechanical Keyboard","Switches":"Blue Mechanical","Layout":"TKL (Tenkeyless)","Backlight":"RGB Per-Key"}', false),
(15, 'USB-C Hub 7-in-1', 'accessories', 'Generic', 6800, 8500, 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=400&fit=crop', 'Expand your laptop connectivity.', '{"Type":"USB-C Hub","Ports":"HDMI, USB3.0 x2, SD, microSD, USB-C PD","Power":"100W Pass-Through","Compatibility":"Universal"}', false),
(16, 'Laptop Cooling Pad', 'accessories', 'Generic', 5500, 7000, 'https://images.unsplash.com/photo-1585792180666-f7347c490ee2?w=500&h=400&fit=crop', 'Keep your laptop cool during intense sessions.', '{"Type":"Cooling Pad","Fans":"5 Quiet Fans","Size":"Up to 17\"","Features":"Adjustable Height, LED"}', false);

-- Reset the sequence to continue after our seeded data
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
