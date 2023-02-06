export const renderProvidesTags = (result, type) =>
  result
    ? [
        ...result.entries.map(({ id }) => ({
          type,
          id,
        })),
        { type, id: "LIST" },
      ]
    : [{ type, id: "LIST" }];

export const renderCreateInvalidatesTags = (type) => [{ type, id: "LIST" }];

export const renderUpdateInvalidatesTags = (arg, type) => [
  { type, id: arg.id },
];
