# Damazon

A full-stack e-commerce marketplace built with Node.js, Express, EJS, and PostgreSQL. Users can browse products, add items to their cart, and place orders. Admins manage the store through a dedicated dashboard.

## Project Description

Damazon is a single-store tech marketplace where buyers can browse 90+ products, leave reviews, and checkout. Admins manage products, orders, and users. Moderators can delete inappropriate reviews.

## Database Schema

> See ERD exported from pgAdmin (attach image here).

**Tables:**
- `users` — id, username, email, password_hash, role, created_at
- `products` — id, name, description, price, category, image_url, created_at
- `cart` — id, user_id, product_id, quantity, created_at
- `orders` — id, buyer_id, total, status, created_at
- `order_items` — id, order_id, product_id, quantity, price
- `reviews` — id, product_id, user_id, rating, comment, created_at
- `session` — sid, sess, expire

## User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Full access: manage products, orders, users, and roles. Access to admin dashboard. |
| **Moderator** | Can delete reviews on product pages. Cannot access admin dashboard. |
| **Buyer** | Can browse products, add to cart, checkout, view orders, and submit/edit their own reviews. |

## Test Account Credentials

> Password for all accounts: `P@$$w0rd!`

| Role | Username |
|------|----------|
| Admin | admin |
| Moderator | moderator |
| Buyer | buyer |

## Known Limitations

- Order detail page does not show individual items (order_items table exists but is not populated at checkout)
- No image upload — product images are referenced by URL/path only
- No email verification on registration
