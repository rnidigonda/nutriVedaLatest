# NutriVeda Supabase Database Setup

## Quick Start

1. Create a Supabase project at https://supabase.com/dashboard
2. Copy your project URL and anon key from Settings > API
3. Update `config.js` with your Supabase credentials:
   ```js
   SUPABASE: {
     URL: 'https://your-project-ref.supabase.co',
     ANON_KEY: 'your-anon-key'
   }
   ```
4. Run the migration in Supabase SQL Editor:
   - Open `migrations/001_initial_schema.sql` and execute it
5. Run the seed data:
   - Open `seed.sql` and execute it

## Tables

| Table | Purpose |
|-------|---------|
| `categories` | Product categories with hierarchy |
| `products` | Full product catalog (94 items migrated) |
| `customers` | Extends Supabase Auth users with profile data |
| `orders` | Order records with payment and shipping info |
| `order_items` | Individual items within an order |
| `reviews` | Customer reviews with ratings and photos |
| `inventory` | Stock change tracking |
| `cart_items` | Server-backed cart (auth + guest sessions) |
| `wishlist_items` | Server-backed wishlist (auth + guest sessions) |

## Row Level Security

- Products and categories: public read access
- Customers: users can only read/update their own profile
- Orders: users can only view their own orders
- Reviews: public read (approved only), authenticated write
- Cart/Wishlist: isolated per user or guest session
- Inventory: admin only (service role access)

## Environment Variables (for Vercel serverless functions)

```
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=... (for admin operations)
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```
