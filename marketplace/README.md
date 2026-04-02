# Damazon

Damazon is an online store where people can buy tech products. Users can look at products, add them to a cart, and place orders. Admins can manage everything from a dashboard.

## Project Description

This project is a full-stack web app built with Node.js, Express, EJS, and PostgreSQL. It has user login, three different roles, a shopping cart and orders. Admins can add, edit, and delete products, manage users, and update order status. Buyers can shop and leave reviews. Moderators can remove bad reviews.

## Database Schema

[ERD](public/images/erd.png)

**Tables:**
- `users` — stores user accounts and roles
- `products` — stores all products in the store
- `cart` — stores items a user added to their cart
- `orders` — stores orders placed by users
- `reviews` — stores reviews left by buyers on products
- `session` — stores login sessions

## User Roles

| Role | What they can do |
|------|-----------------|
| **Admin** | Everything. Add, edit, delete products. See and update all orders. Manage users and change their roles. Access the admin dashboard. |
| **Moderator** | Can delete reviews that break the rules. Cannot access the admin dashboard or touch products and orders. |
| **Buyer** | Can browse products, add to cart, checkout, see their orders, and write or edit their own reviews. |

## Test Account Credentials



Testing Accounts: 

Admin: admin1@email.com
Moderator: moderator1@email.com
User: user1@email.com

> Password for all accounts: `Password1!`


