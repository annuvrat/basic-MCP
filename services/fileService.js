
import fs from "fs-extra";
import path from "path";

const uploadsDir = path.resolve("uploads");
export const handleFileCreate = async (filename, content) => {
  if (!filename || filename.endsWith("/") || filename.endsWith("\\")) {
    throw new Error("Invalid filename: cannot be empty or a folder");
  }

  const filePath = path.join(uploadsDir, filename);

  // Optional: Prevent overwriting a directory with a file
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    throw new Error("Cannot create a file at a directory path");
  }

  await fs.outputFile(filePath, content, "utf8");
  return "File created";
};


export const handleFileUpload = (files) => {
  return {
    message: "Files uploaded successfully",
    files: files.map((file) => file.originalname),
  };
};

export const handleFileEdit = async (filename, command, content) => {
  const filePath = path.join(uploadsDir, filename);
  if (command === "replace") {
    const data = await fs.readFile(filePath, "utf8");
    const updated = data.replace(content.from, content.to);
    await fs.writeFile(filePath, updated, "utf8");
    return "File updated";
  }
  throw new Error("Unknown command");
};

export const handleFileDelete = (filename) => {
  const filePath = path.join(uploadsDir, filename);
  fs.unlinkSync(filePath);
  return "File deleted";
};
