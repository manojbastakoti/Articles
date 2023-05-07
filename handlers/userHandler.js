let opt="";

const generateOTP= () =>{
    for (let i = 1; i <= 6; i++) {
        const randomValue = Math.round(Math.random()*9);
        opt+=randomValue;
    }
    return opt;
};
 
const UserModel=require("../models/User");
const getUsers =(req,res)=>{
    const user={
        name:"Manoj",
        age:24,
    };
    res.json(user);
};

const addUser = (req,res) => {
    const body = req.body;
    // console.log(body.name);

    const user= new UserModel({
        name :body.name,
        email: body.email,
        password:body.password,

    });
    const otpValue = generateOTP();
    user.save();
    res.json({
        success:true,
        message:"User added successfully", 
        otp:otpValue,
    })

};

const loginUser= async(req,res)=>{
    const body=req.body;

    const user= await UserModel.findOne({email:body.email});
    // console.log(user);

    if (!user){
        res.json({
            success:false,
            message:"User not found",
        });
        return false;
    }

    const result = await user.comparePassword(body.password);

    if(!result){
        res.json({
            success:false,
            message:"Email or password is invalid!"
        });
        return false;
    }
    res.json({
        success:true,
        message:"Login successfull"
    });
};

module.exports ={
    getUsers,
    addUser,
    loginUser,
};