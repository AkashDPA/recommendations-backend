# Recommendations Backend API

## **Author**
This project is owned by [AkashDPA](https://www.linkedin.com/in/akashdpa/)

## **Live URL**
- API Live with Documentation: [Live API Docs: https://recommendations-backend-tpk3.onrender.com/docs/](https://recommendations-backend-tpk3.onrender.com/docs/)

## **Features**
- **CRUD operations** for recommendations, and collections.
- **Add/remove recommendations** to/from collections.
- **Pagination** for listing collections and recommendations.
- **Swagger UI** for API documentation.

## **File Structure**
```
src/
├── config/
│   ├── config.js               # Sequelize database configuration
│   └── swagger.js              # Swagger setup
├── controllers/
│   └── collectionsController.js          # Controller for collections
|   └── recommendationsController.js      # Controller for recommendations
├── data/
│   ├── users.csv               # Sample data for users
│   ├── recommendations.csv     # Sample data for recommendations
├── helpers/
│   └── response.js             # Helper functions for response formatting and error handling
├── migrations/
│   ├── YYYYMMDD-create-users.cjs                # Migration for users table
│   ├── YYYYMMDD-create-recommendations.cjs      # Migration for recommendations table
│   ├── YYYYMMDD-create-collections.cjs          # Migration for collections table
│   └── YYYYMMDD-create-collection-mapping.cjs   # Migration for collection-recommendation mapping
├── models/
│   ├── user.js                 # User model
│   ├── recommendation.js       # Recommendation model
│   ├── collection.js           # Collection model
│   └── collection_mapping.js   # Collection-recommendation mapping model
├── routes/
│   └── collectionsRoutes.js        # Routes for collections API
│   └── recommendationsRoutes.js    # Routes for recommendations API
├── seeders/
│   └── YYYYMMDD-seed-data.cjs   # Seeder for populating initial data
└── index.js                    # Entry point for the application
```
 


## **Installation**

### 1. Clone the repo
```bash
git clone git@github.com:AkashDPA/recommendations-backend.git
cd recommendations-backend
```
### 2. Install dependencies
```bash
npm install
```
### 3. Set up environment variables using .env-example
```bash
DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>?sslmode=require
NODE_ENV=production
PORT=3000
```
### 4. Run migrations and seeders
```bash
# Run migrations
npx sequelize-cli db:migrate --env production --migrations-path src/migrations --config src/config/config.js
# Run seeders
npx sequelize-cli db:seed:all --env production --seeders-path src/seeders --config src/config/config.js
```
### 5. Start the server
```bash
npm start
#visit http://localhost:3000/docs
```
 
## **Database Structure**
```
+------------------+           +------------------+            +-----------------------------+
|     Users        |           |  Collections     |            |   Collection Recommendations |
+------------------+           +------------------+            |       Mapping                |
| id (BIGINT)      |<--------- | id (BIGINT)      |            +-----------------------------+
| fname (STRING)   |           | name (STRING)    |            | id (BIGINT)                 |
| sname (STRING)   |           | description (TEXT)|           | collection_id (BIGINT)      |
| profile_picture  |           | user_id (BIGINT) | <--------> | recommendation_id (BIGINT) |
| bio (TEXT)       |           | created_at (DATE)|            | created_at (DATE)          |
| created_at (DATE)|           +------------------+            +-----------------------------+
+------------------+           |                 |
                               |   Recommendations|
                               |  (Many-to-Many)  |
                               |                 |
                               +-----------------+
                                       ^
                                       |
                                       |
                              +-------------------+
                              | Recommendations   |
                              +-------------------+
                              | id (BIGINT)       |
                              | user_id (BIGINT)  |
                              | title (STRING)    |
                              | caption (TEXT)    |
                              | category (STRING) |
                              | created_at (DATE) |
                              +-------------------+

```

## **API Endpoints**

### **Collections**
- **GET /collections**
  - List all collections (supports pagination).
  - Query parameters:
    - `page` (optional, default: 1): The page number.
    - `limit` (optional, default: 10): Number of items per page.
- **GET /collections/:id**
  - Get a specific collection by ID.
- **POST /collections**
  - Create a new collection.
  - Request body:
    - `name`: Name of the collection.
    - `description`: Description of the collection.
    - `user_id`: ID of the user creating the collection.
- **PUT /collections/:id**
  - Update an existing collection.
  - Request body:
    - `name`: Updated name of the collection.
    - `description`: Updated description of the collection.
- **DELETE /collections/:id**
  - Delete a collection.

### **Recommendation Management**
- **GET /collections/:collection_id/recommendations**
  - List recommendations for a specific collection (supports pagination).
  - Query parameters:
    - `page` (optional, default: 1): The page number.
    - `limit` (optional, default: 10): Number of items per page.
- **POST /collections/:collection_id/recommendations/:recommendation_id**
  - Add a recommendation to a collection.
- **DELETE /collections/:collection_id/recommendations/:recommendation_id**
  - Remove a recommendation from a collection.

### **Recommendation**
- **GET /recommendation
  - List recommendations in the system (supports pagination).
  - Query parameters:
    - `page` (optional, default: 1): The page number.
    - `limit` (optional, default: 10): Number of items per page.
