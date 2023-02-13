module.exports = (req, res, next) => {
  let { query: context } = req;
  context = {
    ...context,
    searchTerm: context.q || "",
    search: context.q || "",
    page: Number(context.page) || 1,
    limit: Number(context.limit) || 3,
  };
  context = { ...context, skip: (context.page - 1) * context.limit };
  req.context = context;
  next();
};
