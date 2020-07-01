# bamazon

## Overview

This is a simple e-commerce app that have two interfaces --One for customers and one for managers and supervisor.
* `On customer interface :` The app will show all items from the store's inventory for customers to place orders.
* `On manager and supervisors interface :` The app will help managers to perform inventory control and add exiting products quantity or abb new products. For supervisors the app will help to track department profitability and the total of products sale by department.

### Getting Started

1. Copy this link and Clone the repository on your terminal : <a href="https://github.com/benbaba2525/bamazon.git">  https://github.com/benbaba2525/bamazon.git</a>
2. Run command npm install in Terminal.
3. Set up MySQL database. If you do not already have MySQL installed, you can visit the installation page to install the correct version of MySQL for your    
   machine. Once you have installed MySQL, create the Bamazon database used the SQL code in Bamazon.sql.
4. Choose an interface below.

### Customers
Run the following in your CLI : `node bamazonCustomer.js`

- Running this application will first display all of the items available for sale. Include the ids, products name,  prices of products and products department name.
- The app will then prompt users with two messages.
  1. The app will ask them the ID of the product they would like to buy.
  2. The app will ask how many units of the product they would like to buy.
- Once the customer has placed the order, The application will check if your store has enough of the product to meet the customer's request.If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
- If your store does have enough of the product, it will fulfill the customer's order and show the customer the total cost of their purchase.


![alt-concert-this](https://github.com/benbaba2525/bamazon/blob/master/Gif/customerOrder.gif)

### Managers
Run the following in your CLI : `node bamazonManager.js`
- If a manager selects : `View Products for Sale`, the app will list every available item: the item IDs, names, prices, and quantities.
- If a manager selects: `View Low Inventory`, then it will list all items with an inventory count lower than five.

![alt-concert-this](https://github.com/benbaba2525/bamazon/blob/master/Gif/managerView.gif)

- If a manager selects :` Add to Inventory`, the app will display a prompt that will let the manager "add more" of any item currently in the store.
![alt-concert-this](https://github.com/benbaba2525/bamazon/blob/master/Gif/addQty.gif)

- If a manager selects :` Add New Product`, it will allow the manager to add a completely new product to the store.
![alt-concert-this](https://github.com/benbaba2525/bamazon/blob/master/Gif/addNew.gif)

### Tools/Languages Used:
 - NodeJS
 - JavaScript
 - SQL


### NPM Packages:
- <a href="https://www.npmjs.com/package/mysql">MySQL</a>
- <a href="https://www.npmjs.com/package/inquirer">Inquirer</a>
- <a target="_blank" rel="nofollow" href="https://www.npmjs.com/package/colors">Colors</a>
- <a target="_blank" rel="nofollow" href=" https://www.npmjs.com/package/cli-table">CLI-Table</a>


### Authors
  - Kanyarut Pornamnuay
  <br><a target="_blank" rel="nofollow" href="https://github.com/benbaba2525">Visit My Github Profile</a>
  <br><a target="_blank" rel="nofollow" href="https://benbaba2525.github.io/My-Portfolio/">Visit My Portfolio</a>


### Acknowledgments
  - UCLA Coding Bootcamp   <a target="_blank" rel="nofollow" href="https://bootcamp.uclaextension.edu/coding/">Visit UCLA Coding Bootcamp</a>

### Helpful Link

  - <a target="_blank" rel="nofollow" href="https://en.wikipedia.org/wiki/SQL">SQL</a>
  - <a target="_blank" rel="nofollow" href="https://en.wikipedia.org/wiki/MySQL">MySQL</a>
  - <a target="_blank" rel="nofollow" href="https://dev.mysql.com/doc/workbench/en/">MySQL Workbench Documentation</a>



 
 
  
  
  
