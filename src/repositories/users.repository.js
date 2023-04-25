import { hashPassword, comparePassword } from "../utils.js"
import { userModel } from "../dao/mongoManagers/models/users.model.js"

export default class UsersRepository {
    async createUserRep(user){
        const {email, password} = user
        const userExist = await userModel.find({email, password})
        if(userExist.length===0){
            const hashNewPassword = await hashPassword(password)
            const newUser = {...user, password: hashNewPassword}
            return newUser
        } else {
            return null
        }
    }

    async loginUserRep(user){
        const {email, password} = user
        const usr = await userModel.find({email})
        if(usr.length!==0){
            const isPassword = comparePassword(password, usr[0].password)
            if(isPassword){
            return usr}
        } else {
            return null
        }
    }
}