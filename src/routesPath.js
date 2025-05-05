const routes = {
  homePath: () => '/',
  usersPath: () => '/users',
  userPath: (id = ':id') => `/user/${id}`,
  addUserPath: () => '/add-user',
  coursesPath: () => '/courses',
  addCoursePath: () => '/add-courses',
  loginPath: () => '/login',
};

export default routes;