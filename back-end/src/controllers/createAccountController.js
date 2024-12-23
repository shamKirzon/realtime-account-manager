import createAccountRepository from "../repository/createAccountRepository.js";

async function createAccount(req, res) {
  const { username, password } = req.body;

  if (username && password) {
    try {
      // calling repository:
      const repository = await createAccountRepository(username, password);

      res.status(200).json({
        message: "Account Created Successfully",
        id: repository.id,
        username: repository.username,
        password: repository.password,
      });
    } catch (err) {
      console.error("Error Creating Account", err);
      res.status(400).json({
        message: " Invalid data",
      });
    }
  }
}

export default createAccount;
