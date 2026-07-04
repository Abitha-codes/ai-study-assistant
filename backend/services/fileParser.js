import fs from "fs/promises";
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import path from "path";

export const extractTextFromFile = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  try {
    switch (extension) {
      case ".pdf": {
        const buffer = await fs.readFile(filePath);
        const data = await pdfParse(buffer);
        return data.text.trim();
      }

      case ".docx": {
        const result = await mammoth.extractRawText({
          path: filePath,
        });
        return result.value.trim();
      }

      case ".txt": {
        const text = await fs.readFile(filePath, "utf8");
        return text.trim();
      }

      default:
        throw new Error("Unsupported file type");
    }
  } catch (error) {
    console.error("File Parsing Error:", error.message);
    throw new Error("Failed to extract text from file");
  }
};