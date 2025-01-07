# Sales Management System (SMS)

## Description
The Sales Management System (SMS) is designed to streamline and automate the sales process for businesses, enhancing efficiency and accuracy. It provides a centralized platform for managing product inventories, tracking customer interactions, processing orders, generating sales analytics, and facilitating seamless communication between users and administrators.

## Table of Contents
1. Features
2. Installation
3. Usage
4. System Design
5. System Requirement.


## 1. Features

* <b>User Management</b>
  * <b>Buyers</b>: Browse products, manage orders, view purchase history, add to favorite list, Profile Editing and leave reviews.
  * <b>Admins</b>: Manage products, orders, categories, and customer data.

* <b>Product Management</b>
  * Add, update, delete, and categorize products.
  * Inventory tracking with alerts for low stock.

* <b>Order Processing</b>
  * Support for multiple payment options (e.g., credit card, cash on delivery).
  * Track order statuses (pending, shipped, delivered).

* <b>Security</b>
  * Secure login with role-based access control and JWT-based authentication.
  * Data encryption and regular backups.

* <b>Mobile-Friendly</b>
  * Responsive design for seamless use on mobile devices.
  
* <b>Customizable</b>
  * Configurable fields, forms, and workflows to adapt to various business needs.


## 2. Installation

1. <b>Clone the repository:</b>
```
git clone https://github.com/RakibulHasan2/gadget-sailor-frontend.git
cd gadget-sailor-frontend
```
2. <b>Install dependencies:</b>
```
yarn install
```
3. <b>Configure environment variables:</b>
* Create a <b>.env</b> file with the necessary database credentials and API keys.

4. <b>Start the server:</b>

```
yarn dev
```

## 3. Usage
<b>For Buyers:</b>
1. Sign up or log in to your account.
2. Browse available products by categories or subcategories.
3. Add products to your cart and proceed to checkout.
4. Add products to favorite for future updates.
5. Build Pc according to your choice and generate Build PC Receipt.
4. View your purchase history and submit product reviews.

<b>For Admins:</b>
1. Log in with administrator credentials.
2. Manage products: Add, update, delete, or categorize.
3. Process and track customer orders.
4. Generate and analyze sales reports.


## 4. System Design
* <b>Use Case Diagram</b>


* <b>Entity-Relationship Diagram (ERD)</b></b>
* <b>Entity-Relationship Diagram (ERD)</b>



## 5. System Requirement
#### Hardware Requirements

* <b>Server</b>:
  * Multi-core processor (quad-core or higher).
  * 8GB to 16GB of RAM (minimum).
  * SSD storage for optimal performance.
  * Adequate network bandwidth for handling requests.

* <b>Client Machine</b>:
  * Any modern device (desktop, laptop, or mobile) with internet access.

#### Software Requirements
* <b>Operating System</b>: Linux (Ubuntu recommended) or Windows 10+.
* <b>Web Server</b>: Node.js (version 16 or later).
* <b>Database Management System</b>: MySQL or MongoDB (depending on the implementation).
* <b>Programming Language/Framework</b>:
  * <b>Backend</b>: Node.js with Express.
  * <b>Frontend</b>: React.js or equivalent.
* <b>Tools</b>:
  * Yarn (Package Manager).
  * Git (for version control).
  * IDE or text editor (e.g., VSCode).
* <b>Browser Compatibility</b>: Compatible with modern browsers (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge).
