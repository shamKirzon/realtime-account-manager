import editAccountRepository from "../repository/editAccountRepository.js";

async function editAccountController(req, res) {
  const { username, password } = req.body;
  const id = req.params.id;

  if (username && password && id) {
    try {
      res
        .status(200)
        .json({
          message: "edited succesfully",
          editedId: id,
          editedUsername: username,
          editedPassword: password,
        });
      editAccountRepository(id, username, password);
    } catch (err) {
      console.error("Error Editing Account", err);
      res.status(400).json("ERROR IN EDITING ACCOUNT");
    }
  }
}

export default editAccountController;
