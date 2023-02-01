export const CATALOGS = "catalogs";

export const ROUTES = [
  {
    title: "Справочники",
    id: CATALOGS,
    path: `/${CATALOGS}`,
    childRoutes: [
      {
        title: "Водители",
        id: "drivers",
      },
    ],
  },
];
