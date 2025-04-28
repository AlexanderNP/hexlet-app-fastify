import fastify from "fastify";

const app = fastify();
const port = 3000;

const users = [
  {
    id: 1,
    post: {
      id: 2,
      title: "Some Title",
    }
  },
  {
    id: 2,
    post: {
      id: 2,
      title: "Some Title",
    }
  },
];

app.get("/hello", (req, res) => {
  const name = req.query?.name ?? "World";
  res.send(`Hello ${name}!`);
});

app.get("/users/:userId/post/:postId", (req, res) => {
  const { userId, postId } = req.params;

  const userPost = users.find((item) => item.id === Number(userId) && item.post.id === Number(postId));

  if (userPost) {
    res.send(userPost.post.title);
  } else {
    res.code(404).send({message: "Пост не найден"});
  }
});

app.post("/user", (req, res) => {
  res.send(`Holla ${JSON.stringify(req.body.name)}`);
});

app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
