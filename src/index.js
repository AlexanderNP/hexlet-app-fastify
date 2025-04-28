import fastify from 'fastify';

const app = fastify();
const port = 3000;

app.get('/hello', (req, res) => {
  const name = req.query?.name ?? "World";
  res.send(`Hello ${name}!`);
});

app.post("/user", (req, res) => {
  res.send(`Holla ${JSON.stringify(req.body.name)}`)
})


app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});