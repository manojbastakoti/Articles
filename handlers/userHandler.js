const {createToken} = require("../utils");
let opt="";

const generateOTP= () =>{
    for (let i = 1; i <= 6; i++) {
        const randomValue = Math.round(Math.random()*9);
        opt+=randomValue;
    }
    return opt;
};
 
const UserModel=require("../models/User");
const getUsers =async(req,res)=>{
    try {
        const users= await UserModel.find()
        console.log(users);
        res.json({
            users:users,
        });
        
    } catch (error) {
        console.log(error)
    }


};

const addUser = async(req,res) => {
    const body = req.body;
    // console.log(body.name);

    const user= new UserModel({
        name :body.name,
        email: body.email,
        password:body.password,

    });

    const emailALreadyExists= await UserModel.findOne({email:body.email});

    if (emailALreadyExists){
        res.json({
            success:false,
            message:'Email already exists!',
        });
        return false;
    }

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

    const token = createToken({data:result});
    user.token=token;
    await user.save();

    res.cookie("token",token)

    res.json({
        success:true,
        message:"Login successfull",
        data:{
            token
        }
    });
};

const changePassword=async(req,res)=>{
    try {
        const id=req.params.id;
        const body=req.body;
        const user= await UserModel.findOne({_id:id});

        const result = await user.comparePassword(body.old_password);

        if(!result){
            res.json({
                success:false,
                message:"Old password is wrong!"
            });
            return false;
        }

        // const change= await UserModel.findByIdAndUpdate({_id:id},{
        //     password:body.new_password,
        // });

        user.password= body.new_password;
        user.save();

        res.json({
            success:true,
            message:"Password changed successfully",
        });


    } catch (error) {
        console.log(error)
    }
}

module.exports ={
    getUsers,
    addUser,
    loginUser,
    changePassword,
};