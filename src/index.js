import fastify from "fastify";
import view from '@fastify/view';
import formbody from '@fastify/formbody';
import pug from 'pug';
import yup from 'yup';

const app = fastify();
const port = 3000;

// Подключаем pug через плагин
await app.register(view, { engine: { pug } });
await app.register(formbody);

const users = [
  {
    id: 1,
    post: {
      id: 2,
      title: "Some Title",
    },
    name: "Vasily",
    email: "email1@.ru"
  },
  {
    id: 2,
    post: {
      id: 2,
      title: "Some Title",
    },
    name: "Sasha",
    email: "email2@.ru"
  },
];

const courses = [
  {
    id: "1",
    title: "JavaScript",
    description: "JS COOL!"
  },
  {
    id: "2",
    title: "Backend",
    description: "bACKEND Backend",
  },
  {
    id: "3",
    title: "Python",
    description: "Python TRASH"
  },
  {
    id: "4",
    title: "Java",
    description: "OOP TRASH"
  }
]

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

app.get("/add-user", (req, res) => {
  res.view('src/views/users/add');
});

app.post('/add-user', {
  attachValidation: true,
  schema: {
    body: yup.object({
      name: yup.string().min(3, 'Имя должно быть не меньше трех символов'),
      email: yup.string().email(),
      title: yup.string().min(5, 'Название поста должно быть не меньше 5-ти символов')
    }),
  },
  validatorCompiler: ({ schema }) => (data) => {
    try {
      const result = schema.validateSync(data);
      return { value: result };
    } catch (e) {
      return { error: e };
    }
  },
}, (req, res) => {
  const { name, email, title } = req.body;

  if (req.validationError) {
    const data = {
      name, email, title,
      error: req.validationError,
    };

    res.view('src/views/users/add', data);
    return;
  }

  const user = {
    id: Math.random(),
    name,
    email,
    post: {
      id: Math.random(),
      title: title,
    },
  };

  users.push(user);

  res.redirect('/');
});

app.get("/add-courses", (req, res) => {
  res.view('src/views/courses/add');
});

app.post("/add-courses", {
  attachValidation: true,
  schema: {
    body: yup.object({
      title: yup.string().min(3, 'Название курса должно быть не меньше трех символов'),
      description: yup.string().min(5, 'Описание должно быть не меньше 5 символов'),
    }),
  },
  validatorCompiler: ({ schema }) => (data) => {
    try {
      const result = schema.validateSync(data);
      return { value: result };
    } catch (e) {
      return { error: e };
    }
  },
}, (req, res) => {
  const { title, description } = req.body;

  if (req.validationError) {
    const data = {
      title,
      description,
      error: req.validationError,
    };

    res.view('src/views/courses/add', data);
    return;
  }

  const newCourse = {
    id: Math.random().toString(),
    title,
    description,
  };

  courses.push(newCourse);

  res.redirect('/courses');
});

app.listen({ port }, () => {
  console.log(`Example app listening on port ${port}`);
});
