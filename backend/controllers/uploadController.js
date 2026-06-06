import cloudinary from "../config/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image provided" });
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "shopx/products", resource_type: "image" },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return res.status(500).json({ message: "Image upload failed" });
        }
        res.json({ url: result.secure_url });
      },
    );

    uploadStream.end(req.file.buffer);
  } catch (error) {
    console.error("Upload image error:", error);
    res.status(500).json({ message: error.message || "Unable to upload image" });
  }
};

export { uploadImage };
