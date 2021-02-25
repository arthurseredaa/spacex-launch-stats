const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000

// Allow cross-origin
app.use(cors());

app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
