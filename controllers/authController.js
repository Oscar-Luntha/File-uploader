import bcrypt from "bcryptjs";
import { body , validationResult } from "express-validator"
import { Prisma } from "../generated/prisma";
import { formatDate } from "date-fns";

export const getRegisterPage =  (req, res) => {
  res.render("register", {errors : [], formDats : {} })
}

export const validateRegister = [
    body("username")
      .trim()
      .isLength({min : 3, max : 20})
      .withMessage("Username must be between 3 and 20 characters long.")
      .custom( async (value) => {
        const existingUser = await prisma.user.findUnique({
            where: { username : value},
        })
        if(existingUser){
            throw new Error("Username already exists")
        }
    }),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
]

export const postRegister = [...validateRegister , async (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).render("register", {errors: errors.array(), formData: {username : req.body.username}})
    }
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await prisma.user.create({
            data : {
                username : req.body.username,
                password: hashedPassword,
            }
        })
        res.redirect("/login")
    }catch (error) {
        next(error)
    }
}]