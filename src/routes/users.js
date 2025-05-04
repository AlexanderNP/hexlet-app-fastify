import yup from 'yup';
import routes from "../routesPath.js";

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

export default (app) => {
  app.get(routes.usersPath(), (req, res) => {
    res.view('src/views/users/index', { users });
  });
  
  app.get(routes.userPath(), (req, res) => {
    const { id } = req.params;
  
    const user = users.find((item) => item.id === Number(id));
  
    if (user) {
      res.view('src/views/users/user', { user });
    } else {
      res.code(404).send({message: "Пользователь не найден"});
    }
  });
  
  app.get(routes.addUserPath(), (req, res) => {
    res.view('src/views/users/add');
  });
  
  app.post(routes.addUserPath(), {
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
  
    res.redirect(routes.usersPath());
  });
}

