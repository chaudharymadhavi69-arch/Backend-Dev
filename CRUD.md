1. Advantages of using Mongoose over native MongoDB driver

Using Mongoose instead of the native MongoDB driver provides:

 Key Advantages:
Schema-based structure
→ Define models with fixed structure (unlike MongoDB’s flexible schema)
Validation built-in
→ Easily validate fields (required, min, max, etc.)
Middleware (Hooks)
→ Run logic before/after operations (e.g., hashing password)
Simplified queries
→ Cleaner and more readable syntax
Relationships support
→ Using populate() for referencing documents

 Example:

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true }
});

2. Difference between findOneAndUpdate() and updateOne()
   findOneAndUpdate()
Finds a document and returns it
Can return updated document
Useful when you need updated data immediately
User.findOneAndUpdate(
  { email: "test@gmail.com" },
  { name: "Madhavi" },
  { new: true }
);

  updateOne()
Only updates document
Returns acknowledgment, NOT the updated document
User.updateOne(
  { email: "test@gmail.com" },
  { name: "Madhavi" }
);

 Key Difference:
Feature	findOneAndUpdate()	updateOne()
Returns document	 Yes	 No
Returns updated version	 (with option)	 No
Use case	Need updated data	Just update
3. Purpose of Middleware in Mongoose

In Mongoose, middleware (hooks) are functions that run:

Before (pre) or
After (post) database operations

 Why use middleware?
Data validation
Logging
Password hashing
Auto timestamps
 Example:
userSchema.pre("save", function(next) {
  console.log("Before saving user");
  next();
});


 Runs before saving a document.

4. Pagination in Mongoose

Pagination helps fetch data in chunks (pages) instead of loading everything.

 Basic Implementation:

Use:

limit() → number of records
skip() → number of records to skip
 Example:
const page = 2;
const limit = 5;

const users = await User.find()
  .skip((page - 1) * limit)
  .limit(limit);

 Formula:
skip = (page - 1) × limit

 Optional (Better approach):
Use sorting:
User.find().sort({ createdAt: -1 }).skip(...).limit(...)

5. Embedding vs Referencing in MongoDB

In MongoDB schema design:

 Embedding (Nested Documents)

 Store related data inside same document

{
  name: "Madhavi",
  address: {
    city: "Meerut",
    pincode: 250001
  }
}

 Use when:
Data is small & tightly related
Read operations are frequent
No need for separate queries
 Referencing (Using ObjectId)

 Store reference to another document

{
  name: "Madhavi",
  courseId: ObjectId("123abc")
}

 Use when:
Data is large
Data is shared across multiple documents
Frequent updates required
  Key Difference:
Feature 	Embedding	Referencing
Storage	Same document	Separate collections
Performance	Faster reads	More queries
Data size	Small	Large
Flexibility	Low	High