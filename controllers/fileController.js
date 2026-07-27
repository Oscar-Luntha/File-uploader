import path from "path";
import fs from "fs";
import prisma from "../config/prisma.js";

export const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send("No file uploaded or file failed validation.");
    }
    const { folderId } = req.query;
    await prisma.file.create({
      data: {
        name: req.file.originalname,
        size: req.file.size,
        path: req.file.path,
        userId: req.user.id,
        folderId: folderId || null,
      },
    });

    if (folderId) {
      return res.redirect(`/folders/${folderId}`);
    }
    res.redirect("/dashboard");
  } catch (error) {
    next(error);
  }
};export const getFileDetails = async (req, res, next) => {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!file) {
      return res.status(404).send("File not found.");
    }

    res.render("fileDetail", { file });
  } catch (error) {
    next(error);
  }
};
export const downloadFile = async (req, res, next) => {
  try {
    const file = await prisma.file.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!file || !file.path) {
      return res.status(404).send("File not found.");
    }

    res.download(file.path, file.name);
  } catch (error) {
    next(error);
  }
};