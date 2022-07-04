
// Inserting data in mongo db (mongo db powershell commands)
use student_db              //  to create database->

db                          // check current database-> 

show dbs                    // to show all databases----->

show collections            // used to show all collections in database

db.items.find()             // to show all documents in a collection (items)---
// INSERT DATA IN DATABASE-------------------->>>>>>>

// to insert single document---->
// insertOne({object})
db.items.insertOne({
    name: "iphone", price: 70000, rating: 5, qty: 400, sold: 200
}) 
// here items-> table/collection  db ->current database , insertOne function(to insert one document/row)

// to insert multiple document:---->
// db.items.insertMany(array({},{},{}))
db.items.insertMany([{name: "iphone", price: 70000, rating: 5, qty: 400, sold: 200}, {name: "samsung", price: 40000, rating: 5, qty: 500, sold: 100}, {name: "redmi", price: 30000, rating: 5, qty: 500, sold: 150}])


// SEARCHING(QUERING) FOR DATA IN MONGO DB -------------------->>>>>>
// db.items.find(filter obj)
db.items.find({price: 40000})   //shows all documents with price 40000
db.items.find({rating: 5})   //shows all documents with rating 5

db.items.find({price: {$gte:40000}})   //shows all documents with price (>=) 40000(gte->greater than equalto)
db.items.find({price: {$gt:40000}})   //shows all documents with price greater then 40000(gt->greater than)
// lt/lte for less than/less-than-equalto

// {price: {$gt:40000}} ====== filter obj

//AND opertator(simply by ,)-------------------->>>>
// db.items.find({fil-obj-1},{fil-obj-2})
db.items.find({price: {$gte: 40000}, rating:{$gt: 4}})

//OR opetator-------------------->>>>
// db.items.find({$or: [{filter-obj-1},{filter-obj-2}]})
db.items.find({$or:[{price: {$gte: 40000}},{rating:{$gt: 4}}]})

//we can use anther parameter with filter called projection-------------------->>>>>>
// db.items.find({filter-obj},{proection})
db.items.find({price: {$gte: 40000}},{price: 1})
// {price: 1, qty: 1}  show selected fields
//this wil show only price other values remains false


// DELETING ITEMS FROM MONGO DB-------------->>>>>>>>>>>>>>>>
db.items.deleteOne({price: 40000})       // deletes first item with price 40000 in multi document match

db.items.deleteMany({rating: 5})         // deletes all documents with rating 5

// UPDATE DOCUMENT ITEMS IN MONGO DB-------------->>>>>>>>>>>
// db.items.uptadeOne({filter-obj},{$set:{value to update}})
db.items.updateOne({name: "samsung"}, {$set: {price:2599}})     // used to update single document (if there are multiple documents with name samsung then updateOne() wil update the value in first document only rest remain unchanged)

db.items.updateMany({name: "redmi"},{$set: {price: 9999, rating: 3}})
