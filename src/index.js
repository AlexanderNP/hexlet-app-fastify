import fastify from "fastify";
import view from '@fastify/view';
import pug from 'pug';

const app = fastify();
const port = 3000;

// Подключаем pug через плагин
await app.register(view, { engine: { pug } });

const users = [
  {
    id: 1,
    post: {
      id: 2,
      title: "Some Title",
    },
    name: "Vasily"
  },
  {
    id: 2,
    post: {
      id: 2,
      title: "Some Title",
    },
    name: "Sasha"
  },
];

const courses = [
  {
    id: "1",
    title: "JavaScript",
  },
  {
    id: "2",
    title: "Backend",
  },
  {
    id: "3",
    title: "Python",
  },
  {
    id: "4",
    title: "Java",
  }
]

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

app.get("/", (req, res) => {
  res.view('src/views/users/index', { users });
});

app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const user = users.find((item) => item.id === Number(id));

  if (user) {
    res.view('src/views/users/user', { user });
  } else {
    res.code(404).send({message: "Пользователь не найден"});
  }
});

app.get("/courses", (req, res) => {
  const { title = "" } = req.query;

  const filterCourses = courses.filter(item => item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));

  res.view('src/views/courses/index', { title, courses: filterCourses });
});

app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
