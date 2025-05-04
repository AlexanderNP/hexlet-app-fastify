import yup from 'yup';
import routes from "../routesPath.js";

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

export default (app) => {
  app.get(routes.coursesPath(), (req, res) => {
    const { title = "" } = req.query;
  
    const filterCourses = courses.filter(item => item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()));
  
    res.view('src/views/courses/index', { title, courses: filterCourses });
  });
  
  app.get(routes.addCoursePath(), (req, res) => {
    res.view('src/views/courses/add');
  });
  
  app.post(routes.addCoursePath(), {
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
        route: routes.addCoursePath,
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
  
    res.redirect(routes.coursesPath());
  });
}