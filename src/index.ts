import dataSource from "./dataSource";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { WildersResolver } from "./resolvers/WildersResolver";
import { SkillResolver } from "./resolvers/SkillResolver";

const start = async (): Promise<void> => {
  await dataSource.initialize();
  const schema = await buildSchema({
    resolvers: [WildersResolver, SkillResolver],
  });
  const server = new ApolloServer({
    schema,
  });
  try {
    const { url } = await server.listen({ port: 5000 });
    console.log(`Server ready at ${url}`);
  } catch {
    console.log("Error starting the server");
  }
};
void start();
