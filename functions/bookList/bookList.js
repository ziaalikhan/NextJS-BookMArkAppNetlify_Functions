const { ApolloServer, gql } = require("apollo-server-lambda");
const faunadb = require("faunadb");
q = faunadb.query;
const dotenv = require("dotenv");
dotenv.config();


let adminClient = new faunadb.Client({
  secret: process.env.FAUNADB_ADMIN_SECRET,
  domain: "db.us.fauna.com",
});


const typeDefs = gql`
  type AllBookMarks {
    id: ID
    task: String
    url: String
  }
  type Query {
    bookmarks: [AllBookMarks]
  }
  type Mutation {
    addBookMark(task: String, url: String): AllBookMarks
    deleteTodo(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    bookmarks: async () => {
      try {
        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("bookData"))),
            q.Lambda((x) => q.Get(x))
          )
        );
        console.log(result.data , '========>>>>.');
        return result.data.map((val) => {
          return {
            id: val.ref.id,
            task: val.data.task,
            url: val.data.url,
          };
        });
      } catch (err) {
        console.log(err);
      }
    },

  },
  Mutation: {
    addBookMark: async (_, { task, url }) => {
      console.log("data====> ", task, url);
      try {
        const result = await adminClient.query(
          q.Create(q.Collection("bookList"), {
            data: {
              task,
              url,
            },
          })
        );
        return result.data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTodo: async (_, args) => {
      const id = args.id;
      // return console.log(`${id}  id ====>>> `)
      try {
        const result = await adminClient.query(
          q.Delete(q.Ref(q.Collection("bookList"), id))
        );
        return console.log(`${result}=====>>>>is Deleted here`);
      } catch (error) {
        console.log("======>>>", error);
      }
    },
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = server.createHandler();

module.exports = { handler };
