const express = require("express");
const router = express.Router();
const userService = require("../services/userService");
const checkJwt = require("../middleware/authToken");
const UserModel = require("../models/UserModel");
//Guiherme - rota de login.
router.get("/user/:id?", checkJwt, async (req, res) => {
  try {
    const { id } = req.params;
   const getOneUser = await userService.getUser(id);
   
    res.status(getOneUser.statusCode).json(getOneUser.response);
      
    
  } catch (error) {
    res
      .status(500)
      .json({ msg: " failed to get user"});
  }
});
//Guilherme - rota de postar.
router.post("/user", checkJwt, async (req, res) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  const responseCreate = await userService.acessToken(accessToken);
  req.user = responseCreate.data;

  const userValidationExists = await UserModel.getFindById(req.user.sub);
  if (!userValidationExists.status) {
    return res
      .status(500)
      .json({ error: userValidationExists.err, msg: userValidationExists.msg });
  }

  if (userValidationExists.response.length > 0) {
    return res.status(400).json({ msg: " user already registered " });
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

  res.status(201).json({ msg: " user created sucessfully" });
});
//Guilherme - rota de atualizar.
router.put("/user", checkJwt, async (req, res) => {
  try {
    const { name, picture } = req.body;
    const { sub } = req.user;
    const upatedeUser = await userService.updateUser(sub, name, picture);

    res.status(upatedeUser.statusCode).json(upatedeUser.response);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error update publication", message: error.message });
  }
});
//Guilherme - rota de deletar.
router.delete("/user/:id?", checkJwt, async (req, res) => {
  try{  
    const {id} = req.params;
    const deleteId = await userService.deleteUser(id, name, picture);
    res.status(deleteId.statusCode).json(deleteId.response);
  

  }catch (error) {
    res
      .status(500)
      .json({ error: "Error update publication", message: error.message });
  }
  

});

module.exports = router;
