const {CreateUser,FindUser,FindTaskUserById,CreateTask} = require('../../database/repository/user-task-repo')
const {GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../../utils');

const RegisterUser = async (req , res) => {
    try {
        const { userName, password} = req.body;
        const existingUser = await FindUser(userName);
            if (existingUser) {
                return res.status(406).json({ message: 'UserName already exists' });   //user already exist not acceptable
            }
        let salt = await GenerateSalt();
        let userPassword = await GeneratePassword(password, salt);
        const newUser = await CreateUser({userName,password:userPassword});
        const token = await GenerateSignature({ userName: userName, _id: newUser._id });
        return res.status(201).json({ message: 'User registered successfully',"accessToken":token , "userName" :userName});
    } catch (error) {
        res.status(400).json({ message: 'Bad Request' })
    }
}

const LoginUser = async (req,res) => {
    try {
        const { userName, password } = req.body;
        const existingUser = await FindUser(userName);
        console.log("🚀 ~ file: userController.js:26 ~ LoginUser ~ existingUser:", existingUser)
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }else{
            const validPassword = await ValidatePassword(password, existingUser.password)
            if(validPassword){
                const token = await GenerateSignature({ email: existingUser.email, _id: existingUser._id });
                return res.json({message: 'Login successful', "accessToken": token, "userName": existingUser?.userName,"_id":existingUser._id})
            }else{
                return res.status(404).json({message : 'Invalid Credentials'})
            }
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {RegisterUser,LoginUser}