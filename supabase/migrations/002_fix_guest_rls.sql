-- Fix RLS policies to properly allow anonymous/guest cart and wishlist operations
-- The anon role needs explicit SELECT, INSERT, UPDATE, DELETE grants on the tables

-- Grant table permissions to anon and authenticated roles
GRANT SELECT ON products TO anon, authenticated;
GRANT SELECT ON categories TO anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE ON cart_items TO anon, authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON wishlist_items TO anon, authenticated;

GRANT SELECT, INSERT ON orders TO anon, authenticated;
GRANT SELECT, INSERT ON order_items TO anon, authenticated;
GRANT SELECT, INSERT ON reviews TO anon, authenticated;
GRANT UPDATE ON reviews TO authenticated;

GRANT SELECT, INSERT, UPDATE ON customers TO authenticated;

-- Drop and recreate guest policies with explicit WITH CHECK for inserts
DROP POLICY IF EXISTS "Guest cart access by session" ON cart_items;
CREATE POLICY "Guest cart read by session"
  ON cart_items FOR SELECT
  USING (guest_session_id IS NOT NULL AND customer_id IS NULL);

CREATE POLICY "Guest cart insert by session"
  ON cart_items FOR INSERT
  WITH CHECK (guest_session_id IS NOT NULL AND customer_id IS NULL);

CREATE POLICY "Guest cart update by session"
  ON cart_items FOR UPDATE
  USING (guest_session_id IS NOT NULL AND customer_id IS NULL)
  WITH CHECK (guest_session_id IS NOT NULL AND customer_id IS NULL);

CREATE POLICY "Guest cart delete by session"
  ON cart_items FOR DELETE
  USING (guest_session_id IS NOT NULL AND customer_id IS NULL);

-- Same for wishlist
DROP POLICY IF EXISTS "Guest wishlist access by session" ON wishlist_items;
CREATE POLICY "Guest wishlist read by session"
  ON wishlist_items FOR SELECT
  USING (guest_session_id IS NOT NULL AND customer_id IS NULL);

CREATE POLICY "Guest wishlist insert by session"
  ON wishlist_items FOR INSERT
  WITH CHECK (guest_session_id IS NOT NULL AND customer_id IS NULL);

CREATE POLICY "Guest wishlist update by session"
  ON wishlist_items FOR UPDATE
  USING (guest_session_id IS NOT NULL AND customer_id IS NULL)
  WITH CHECK (guest_session_id IS NOT NULL AND customer_id IS NULL);

CREATE POLICY "Guest wishlist delete by session"
  ON wishlist_items FOR DELETE
  USING (guest_session_id IS NOT NULL AND customer_id IS NULL);

-- Allow anon to read products (needed for cart joins)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO anon;
GRANT INSERT, UPDATE, DELETE ON cart_items TO anon;
GRANT INSERT, UPDATE, DELETE ON wishlist_items TO anon;
GRANT INSERT ON orders TO anon;
GRANT INSERT ON order_items TO anon;
