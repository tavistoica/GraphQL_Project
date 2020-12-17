GraphQL server made with Express.js with MongoDB as database solution

1. npm install
2. install mongodb on port 27017
3. npm start
4. Access http://localhost:4000

Problem:

User Story - Summary
as a User using GraphQL API I need to be able to query and edit a set of quotes
Acceptance Criteria
• Create the GraphQL Server for Your Node.js App
• Create a schema with a type Quote that has id, phrase and quoter as attributes
• Create the following queries in the Quote schema:
o quotes – retrieve all the stored quotes
o quotesByquoter – retrieve all the the quote by a specific quote
• Create the following mutation in the Quote Schema:
o addQuote
o editQuote
o deleteQuote
• Feel free to store the quotes data in your favourite storage (MySql DB, Redis, Key Value
store etc.)
Technical Constraints
• Using Apollo server
• Using Node.js
