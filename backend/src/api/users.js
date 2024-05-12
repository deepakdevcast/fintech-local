import { Router } from "express";
import { Users } from "../db/mongo.js";

const users = Router();

users.get("/find", async (req, res) => {
  const users = await Users.find({'$nor': [{
    email: req.user.email
  }]},
    {
      name: 1,
      _id: 1,
      email: 1,
      balance: 1,
    }
  );
  return res.status(201).json(users);
});

users.get("/details", async (req, res) => {
  const users = await Users.findOne({email: req.user.email},
    {
      name: 1,
      _id: 1,
      email: 1,
      balance: 1,
    }
  );
  if (!users) return res.status(404).json({message: 'No users found'});
  return res.status(201).json(users);
});
users.get('/', async (req, res) => {
  const {name} = req.query;
  if (!name || name.length === 0) {
    return res.status(400).json({ message: "Please provide a name!" });
  }
  const users = await Users.find({ name: {
    $regex: name,
    $options: "i"
    }
  }, {
    name: 1,
    _id: 1,
    email: 1
  })
  return res.status(201).json(users);
});

export default users;