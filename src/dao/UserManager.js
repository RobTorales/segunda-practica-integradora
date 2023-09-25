import { userModel } from "./models/user.model.js";

class UserManager {
    async addUser(user) {
        try {
            await userModel.create(user)
            console.log("User added!");
    
            return true;
        } catch (error) {
            return false;
        }
    }

    async login(user) {
        try {
            const userLogged = await userModel.findOne({email:user}) || null;
            
            if (userLogged) {
                console.log("User logged!");
                return userLogged;
            }

            return false;
        } catch (error) {
            return false;
        }
    }

    async restorePassword(user, pass) {
        try {
            const userLogged = await userModel.updateOne({email:user}, {password:pass}) || null;
            
            if (userLogged) {
                console.log("Password Restored!");
                return userLogged;
            }

            return false;
        } catch (error) {
            return false;
        }
    }
}


export default UserManager;