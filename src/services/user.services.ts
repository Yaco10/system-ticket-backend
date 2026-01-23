import { UserEdit } from "../dto/user.ticket";
import { User } from "../models/user.model";
import { Role } from "../types/user.types";


export async function getMe(userId:string) {
    if(!userId){
        throw new Error("Unauthorized")
    }

    const user = await User.findById(userId)

    if(!user){
        throw new Error("User not found")
    }

    return user
}

export async function editMe(input: UserEdit, userId: string){
    if(!userId){
        throw new Error("Unauthorized")
    }

    if(!input.name && !input.city && !input.lastname){
        throw new Error("No fields provided to update")
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {$set: input},
        {new: true}
    )

    if (!user) {
        throw new Error("User not found")
    }

    return user
}

export async function getUsers(){
  return User.find().select("-passwordHash");
}

export async function editUserRole(userId: string, role: Role, currentAdminId: string){


    if (userId === currentAdminId) {
        throw new Error("Cannot change your own role");
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {$set: {role: role}},
        {new: true}
    )

    if (!user) {
        throw new Error("User not found")
    }

    return user
}