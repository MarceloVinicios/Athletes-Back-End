const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const checkJwt = require("../middleware/authToken");
const UserModel = require("../models/UserModel");

router.get("/user/token", checkJwt, async (req, res) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const responseCreate = await userService.acessToken(accessToken);
    req.user = responseCreate.data;

    res.status(200).json({ msg: "Acess token successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error getting token", message: error.message });
  }
});

router.post("/user", checkJwt, async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const responseCreate = await userService.acessToken(accessToken);
  req.user = responseCreate.data;
  console.log(req.user);

  const userValidationExists = await UserModel.getFindById(req.user.sub);
  if (!userValidationExists.status) {
    return res
      .status(404)
      .json({ error: userValidationExists.err, msg: userValidationExists.msg });
  }

  if (userValidationExists.response.lenght > 0) {
    return res.status(202).json({ msg: " user already registered " });

  }

  const resultCreateUser = await UserModel.create(
    req.user.sub,
    req.user.email,
    req.user.name,
    req.user.picture
  );
  if (!resultCreateUser.status) {
    return res
      .status(404)
      .json({ error: resultCreateUser.err, msg: resultCreateUser.msg });
  }

  res.status(200).json({ msg: " user created sucessfully" });
});

router.put("/user", checkJwt, async(req, res)=>{
  const upatedeUser =  await userService(req.params.id);
  const updatedUser = req.body;
  const existingUser = users.find((user) => {
    return (
      (user.name === updatedUserData.name ||
        user.email === updatedUserData.email) &&
      user.id !== userId
      
    );
    
  });
  if (existingUser) {
    return res.status(400).json({ error: 'Name, ID or email already exist' });
  }
  const searchUser = userValidationExists.getFindById((user) => user.id===serId);
})

router.delete("/id", checkJwt, async(req, res)=>{
  const deleteId = req.body(deleteId);
  if (searchUser!= res.status(404).json)({ error: 'User not found' });
   
   



})



module.exports = router;
