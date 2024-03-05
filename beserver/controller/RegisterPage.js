import { User } from "../modals/Registermodal.js";
import { Op } from "sequelize";

const registerpage = async (req, res) => {
  const { id, username, password } = req.body;
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { username: username }
        ]
      }
    });
    
    
    if (!existingUser) {
      
      const newUser = await User.create({ id, username, password });
      res.send("user registed sucessfully");
    } else {
      
      res.send("User already present");
    }
  
  } catch (error) {
    console.log(error);
    res.send("Internal server error");
  }
};

export default registerpage;



