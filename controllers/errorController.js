exports.get404 = (req, res, next) => {
  res.status(404).render("page_404", { pageTitle: "404 - Page Not Found" ,
    isLoggedIn: req.isLoggedIn,
    user : req.session.user,
  });
};
