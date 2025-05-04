import fastify from "fastify";
import view from "@fastify/view";
import formbody from "@fastify/formbody";
import pug from "pug";
import routes from "./routesPath.js";
import controllers from "./routes/index.js";

const app = fastify();
const port = 3000;

await app.register(view, {
  engine: { pug },
  defaultContext: { routes },
});

await app.register(formbody);

app.get(routes.homePath(), (req, res) => {
  res.view("src/views/index");
});

controllers.forEach((item) => item(app));

app.listen({ port }, () => {
  console.log(`App listening on port ${port}`);
});
