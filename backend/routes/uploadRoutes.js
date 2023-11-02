import path from "path"; // Module for working with file paths
import express from "express";
import multer from "multer"; // Middleware for handling file uploads
// Create an instance of an Express router
const router = express.Router();

// Define the STORAGE configuration for multer
const storage = multer.diskStorage({
  //cb=callback
  destination(req, file, cb) {
    // Set the directory where uploaded files will be stored
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    // Define the filename for the uploaded file, including the original extension
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define a function to filter the uploaded files
function checkFileType(req, file, cb) {
  // Define allowed file types and mimetypes for images
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  // Check if the file extension and mimetype match the allowed types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    // If it's a valid image, pass it along
    cb(null, true);
  } else {
    // If it's not a valid image, reject it and provide an error message
    cb(new Error("Images only!"), false);
  }
}

// Create a multer instance with the defined storage and filter
const upload = multer({ storage });

// Define a route that handles POST requests for uploading images
//img=>storage=>file.fieldname
router.post("/", upload.single("img"), (req, res) => {
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

// Export the Express router for use in other parts of the application
export default router;
