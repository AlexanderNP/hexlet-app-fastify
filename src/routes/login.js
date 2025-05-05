import routes from "../routesPath.js"

export default (app) => {
  app.get(routes.loginPath(), (req, res) => {
    res.view("src/views/login/index")
  })

  app.post(routes.loginPath(), (req, res) => {
    const { email, password } = req.body;

    req.session.email = email;
    res.redirect(routes.homePath());
  })
}