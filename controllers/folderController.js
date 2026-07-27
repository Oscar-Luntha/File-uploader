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