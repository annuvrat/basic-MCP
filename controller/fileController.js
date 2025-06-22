import {
  handleFileCreate,
  handleFileDelete,
  handleFileEdit,
  handleFileUpload,
} from "../services/fileService.js";

export const uploadFiles = (req, res) => {
  try {
    const result = handleFileUpload(req.files);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const editFile = async (req, res) => {
  const { filename, command, content } = req.body;
  try {
    const result = await handleFileEdit(filename, command, content);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteFile = (req, res) => {
  const { filename } = req.body;
  try {
 
    const result = handleFileDelete(filename);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const createFile = async (req, res) => {
  const { filename, content } = req.body;
  try {
    const result = await handleFileCreate(filename, content);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
