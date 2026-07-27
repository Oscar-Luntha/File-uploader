import prisma from "../config/prisma.js";

export const getDashboard = async (req, res, next) => {
    try{
        const folders = await prisma.folder.findMany({
            where : {
                userId: req.user.is,
            },orderBy : { createdAt: "desc"}
        })
        const files = await prisma.file.findMany({
            where : {
                userId : req.user.id,
                folderId : null
            },orderBy: {createdAt : "desc"}
        })
        res.render("dashboard", {user : req.user, folders, files})
    }catch (error){
        next(error)
    }
}