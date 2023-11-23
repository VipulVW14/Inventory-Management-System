## Inventory Managment System

This is a simple RESTful API built with Express.js for managing an inventory system. It allows you to create, read, update, and delete items in the inventory and record transactions.

## Installation
```bash
git clone https://github.com/VipulVW14/Inventory-Management-System.git
cd Inventory-Management-System
npm install
tsc -b
node dist/index.js
```
## Endpoints

## Items
- GET /items : Retrieve a list of all items.
- POST /items : Add a new item to the inventory.
- GET /items/:id : Retrieve a specific item by its id.
- PUT /items/:id : Update a specific item by its id.
- DELETE /items/:id : Remove a specific item from the inventory.

## Transactions
- POST /items/:id/transaction : Record a transaction for a specific item.
- GET /items/:id/transactions : Retrieve all transactions for a specific item.


## Features

- Manage items in the inventory (create, read, update, delete).
- Record transactions for items (IN and OUT).
- Proper error handling and data validation.
- Uses a database to persist data (MongoDB).

## Requirements

- Node.js
- npm or yarn
- Your choice of database (MongoDB, MySQL, PostgreSQL, etc.)

## Database Schema

### Item Model
- id: A unique identifier for the item.
- name: The name of the item.
- description: A description of the item.
- quantity: The quantity of the item in the inventory.
- last updated timestamp: The timestamp of the last update to the item.

### Transaction Model
- id: A unique identifier for the transaction.
- item id: The id of the item associated with the transaction.
- type: Either "IN" for items added to the inventory or "OUT" for items removed from the inventory.
- quantity: The quantity involved in the transaction.
- transaction timestamp: The timestamp of the transaction.

## Assumptions

- Database Choice: We assumed the use of MongoDB as the database for this project due to its flexibility and scalability. However, the system is designed to work with other databases as well.

- Validation Rules: Assumptions were made about validation rules for data integrity. These rules include non-negative quantities and expected data formats.

- Design Decision: The system design follows a RESTful API architecture to provide a clear and structured interface for managing inventory items and transactions.

- Error Handling: Comprehensive error handling is implemented to provide meaningful error responses and enhance the user experience.

- Additional Features: Additional features such as authentication and authorization were considered but are not implemented in this basic version of the system.

