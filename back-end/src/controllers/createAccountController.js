
function createAccount(req, res) {
    let {username, password} = req.body; 
    
    if(username && password){
        console.log("Received data from controller: ", {username, password}); 
        res.status(200).json({message: "this is data from controller",data: {username, password}});
    }else{
        res.status(400).json({message: "invalid data"})
    }
}

export default createAccount;
