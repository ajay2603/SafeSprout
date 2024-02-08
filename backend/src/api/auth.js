const express = require("express");
const router = express.Router();

const { User } = require("../database/models");

router.post("/login", async (req, res) => {
  console.log("login called");

  const { userName, password } = req.body;

  console.log("userName: " + userName);
  console.log("password: " + password);
  try {
    const usr = User.findOne({ userName: userName });
    if (usr) {
      if (usr.password == password) {
        res.json({ stat: true });
      } else {
        res.json({ stat: true, err: false, usr: true });
      }
    } else {
      res.json({ stat: false, err: false, usr: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ stat: false, err: true });
  }
});

router.post("/signup", async (req, res) => {
  const { userName, password, name, email } = req.body;

  const usr = await User.findOne({ userName: userName });
  if (usr) {
    res.json({ stat: false, err: false });
  } else {
    const new_user = new User({
      userName: userName,
      password: password,
      name: name,
      email: email,
    });
    new_user
      .save()
      .then((resp) => {
        res.json({ stat: true, userName: userName });
      })
      .catch((err) => {
        console.log(err);
        res.json({ stat: false, err: true });
      });
  }
});

module.exports = router;
