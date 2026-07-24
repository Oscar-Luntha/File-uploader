const getHomePage = (req, res) => {
  res.render("index", {
    title: "File Drive App",
    user: req.user || null,
  });
};

module.exports = {
  getHomePage,
};