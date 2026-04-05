1. Key Differences between SQL and NoSQL Databases
SQL Databases (Relational)

Examples: MySQL, PostgreSQL

Structured data (tables with rows & columns)
Fixed schema (schema must be defined before inserting data)
Uses SQL (Structured Query Language)
Supports joins (relations between tables)
ACID compliant (high consistency)

 Example:

SELECT * FROM students WHERE GPA > 3.5;

 NoSQL Databases (Non-relational)

Examples: MongoDB, Cassandra

Unstructured / semi-structured data
Flexible schema (schema-less)
Stores data as JSON-like documents, key-value, graph, etc.
Scales horizontally easily
Focus on performance and scalability

 Example (MongoDB):

db.students.find({ GPA: { $gt: 3.5 } })

 Key Differences Summary
Feature	SQL	NoSQL
Structure	Table-based	Document / Key-Value
Schema	Fixed	Flexible
Scalability	Vertical	Horizontal
Relationships	Strong (joins)	Weak / embedded
Use Case	Banking systems	Big data, real-time apps
2. CAP Theorem

The CAP Theorem states that a distributed system can only guarantee 2 out of 3 properties:

C (Consistency) → All nodes have the same data
A (Availability) → System always responds
P (Partition Tolerance) → Works despite network failures
 Why not all 3?

Because in case of a network partition:

If you ensure consistency, you may need to reject requests →  Availability
If you ensure availability, data might differ →  Consistency

👉 So trade-off is unavoidable in distributed systems.

3. When to Prefer MongoDB

Use MongoDB in these scenarios:

 1. Flexible Schema Required
Example: User profiles with different fields
No need to redesign schema every time
 2. Large-scale Applications (Big Data)
Example: Social media apps
Handles massive data with horizontal scaling
 3. Real-time Applications
Example: Chat apps, IoT systems
Fast read/write operations
ques 4. Why MongoDB Uses BSON Instead of JSON

MongoDB internally uses BSON (Binary JSON) instead of plain JSON because:

🔹 Advantages of BSON:
Faster to parse (binary format)
Supports more data types (Date, ObjectId, Binary)
Efficient storage and traversal
Better performance for queries

JSON is just for readability; BSON is optimized for machines.

5. MongoDB Query
 Requirement:

Find students with:

GPA > 3.5
Enrolled in "CS101"
 Query:
db.students.find({
  GPA: { $gt: 3.5 },
  course: "CS101"
})