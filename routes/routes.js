const express = require("express")
const  Router  = express.Router()
const { v4: uuidv4 } = require('uuid');
const uniqueId = uuidv4();
const usersObj = require('../model/user');

//default api request
Router.get("/",(req,res) => {
    res.send("Hellow World")
})


//api request to get all users

Router.get("/users", async (req, res) => {
    try {
      // Retrieve all users from the database using the User model
      const users = await usersObj.find();
        //if no users found return response error 404
      if (!users || users.length === 0) {
        return res.status(404).json({ success: false, data: "User not found" });
      }
      // Return the users in the response
      return res.status(200).json({ success: true, data: users });
    } catch (error) {
    //returning response error if server runs inyto problem
    return res.status(500).json({ success: false, data: "Internal server error" });
    }
  });
  


//api request to update specific user
  Router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const body = req.body;
  
    try {
      if (Object.keys(body).length === 0) {
        return res.status(400).json({ success: false, message: "Incorrect request" });
      }
              //creatig databse obj
              let User =  new usersObj();

      const user = await usersObj.findOne({ _id: id });
      if (!User || User.length === 0) {
        return res.status(500).json({ success: false, data: "Internal server error" });
      }

  
      if ("email" in body) {
        user.email = body.email;
      }
      if ("firstName" in body) {
        user.firstName = body.firstName;
      }
      await user.save();

      return res.status(200).json({ success: true, message: "User Updated Succesffuly" });
    } catch (error) {
    //returning response error if server runs inyto problem
      return res.status(500).json({ message: "Internal server error: " + error });
    }
  });



//api request to add user
Router.post("/add",async (req,res) => {
    const id = uniqueId;
    const body = req.body
    try{
        if(Object.keys(body).length==0){
            return res.status(400).json({sucess: false, data: "Incorrect request"})
        }
        let user =  new usersObj();

        if (!user || user.length === 0) {
            return res.status(500).json({ success: false, data: "Internal server error" });
          }
        user.email = req.body.email;
        user.firstName = req.body.firstName;
        await user.save(); // Save the user to the database
    
        return res.status(200).json({sucess: true, message:"User added succesfully"})
    }
    catch{
        //returning response error if server runs inyto problem
        return res.status(500).json({message: "Internal server error"})

    }

})



//api request to get specific user
Router.get("/user/:id", async (req, res) => {
    const userId = req.params.id;
    try {
        let user =  new usersObj();
        if (!user || user.length === 0) {
            return res.status(500).json({ success: false, data: "Internal server error" });
          }
    //retrievinhg specific user
      const User = await usersObj.findOne({ _id: userId });
      if (User) {
        //storing user details in new obj
        const userReturn = {
          email: User.email,
          firstName: User.firstName
        };
        return res.status(200).json({ success: true, user: userReturn, message: "User found" });
      } else {
                //if user not found returning error 404response error
        return res.status(404).json({ success: false, message: "User Not Found" });
      }
    } catch (error) {
        //returning response error if server runs inyto problem
      return res.status(500).json({ message: "Internal server error: " + error });
    }
  });



//api request to depelet specific user
  Router.delete("/delete/:id", async (req, res) => {
    //getting id passed in request
    const id = req.params.id;
  
    try {

          //retrieveing user
      const user = await usersObj.findOne({ _id: id });
      if (!user || user.length === 0) {
        return res.status(500).json({ success: false, data: "Internal server error" });
      }
      //deleteing user
      await user.deleteOne();
      return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
    //returning response error if server runs inyto problem
      return res.status(500).json({ message: "Internal server error: " + error });
    }
  });
  
  
module.exports = Router;
