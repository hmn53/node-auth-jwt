const router = require("express").Router();
const validate = require("./validate-token");
router.get("/", validate, (req, res) => {
  const posts = [
    { id: "93849843948", title: "My first post", description: "Lorem Ipsum" },
  ];
  res.send(posts);
});

module.exports = router;
