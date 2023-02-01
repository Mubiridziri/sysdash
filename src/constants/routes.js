export const ADMINISTRATION = "administration";

export const ROUTES = [
  {
    title: "Администрирование",
    id: ADMINISTRATION,
    path: `/${ADMINISTRATION}`,
    childRoutes: [
      {
        title: "Внешние системы",
        id: "externalSystems",
      },
    ],
  },
];
