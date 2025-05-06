import fastify from "fastify";
import session from '@fastify/session';
import fastifyCookie from '@fastify/cookie';
import view from "@fastify/view";
import formbody from "@fastify/formbody";
import pug from "pug";
import routes from "./routesPath.js";
import controllers from "./routes/index.js";

const app = fastify();
const port = 3000;
const host = '0.0.0.0';

await app.register(view, {
  engine: { pug },
  defaultContext: { routes },
});

await app.register(formbody);
await app.register(fastifyCookie);
await app.register(session, {
  secret: 'a secret with minimum length of 32 characters',
  cookie: { secure: false },
});

app.get(routes.homePath(), (req, res) => {
  const { email } = req.session;

  res.view("src/views/index", { user: email });
});

controllers.forEach((item) => item(app));

app.listen({ 
  host,
  port,
}, () => {
  console.log(`App listening on port ${port}`);
});
