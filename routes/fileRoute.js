
import express from "express";
import multer from "multer";
import {
  uploadFiles,
  editFile,
  deleteFile,
  createFile
} from "../controller/fileController.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.any(), uploadFiles);
router.post("/edit", editFile);
router.delete("/delete", deleteFile);
router.post("/create", createFile);

export default router;
