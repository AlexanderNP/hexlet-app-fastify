const routes = {
  homePath: () => '/',
  userPath: (id = ':id') => `/user/${id}`,
  addUserPath: () => '/add-user',
  coursesPath: () => '/courses',
  addCoursePath: () => '/add-courses',
};

export default routes;