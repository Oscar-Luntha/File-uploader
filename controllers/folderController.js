import {body, validationResult} from "express-validator"
import prisma from "../config/prisma.js"

export const validateFolder = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Folder name is required")
        .isLength({max : 50})
        .withMessage("Folder name must be under 50 characters.")
]

export const createFolder = [
    ...validateFolder, async (req, res, next) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).redirect("/dashboard")
        }
        try{
            await prisma.folder.create({
                data: {
                name: req.body.name,
                userId: req.user.id,
                },
            });
            res.redirect("/dashboard");
        }catch(error){
            next(error)
        }
    }
]
export const getFolderDetails = async (req, res, next) => {
    try {
        const folderId = req.params.id;
        const folder = await prisma.folder.findFirst({
            where : {
                id : folderId,
                userId: req.user.id
            }, include : {
                files : {
                    orderBy : {createdAt : "desc"}
                }
            }
        })
        if (!folder) {
            return res.status(404).send("Folder not found.");
        }
        res.render("folder", {user: req.user,folder,files: folder.files,});
    } catch (error){
        next(error)
    }
}

export const updateFolder = [ ...validateFolder, async (req, res, next) => {
    const errors = validationResult(req)
    const folderId = req.params.id;
    if (!errors.isEmpty()) {
      return res.status(400).redirect(`/folders/${folderId}`);
    }
    try { 
        await prisma.folder.updateMany({
            where : {
                id: folderId,
                userId: req.user.id,  
            },data: {
                name: req.body.name,
            },
        })
        res.redirect("/dashboard")
    }catch (error) {
        next(error)
    }
}]

export const deleteFolder = async (req, res, next) => {
  try {
    const folderId = req.params.id;
    await prisma.folder.deleteMany({
      where: {
        id: folderId,
        userId: req.user.id,
      },
    });
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};