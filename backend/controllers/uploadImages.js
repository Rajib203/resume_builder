import fs from "fs";
import path from "path";
import upload from "../middleware/uploadMiddleware.js";
import Resume from "../models/resumeModel.js";

// Wrap multer in a Promise for async/await compatibility
const uploadFields = upload.fields([
  { name: "thumbnail", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
]);

export const uploadResumeImages = async (req, res) => {
  try {
    // Run multer upload
    await new Promise((resolve, reject) => {
      uploadFields(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    const resumeId = req.params.id;
    const resume = await Resume.findOne({
      _id: resumeId,
      userId: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const uploadsFolder = path.join(process.cwd(), "uploads");
    const baseUrl = `${req.protocol}://${req.get("host")}`;

    const newThumbnail = req.files?.thumbnail?.[0];
    const newProfileImage = req.files?.profileImage?.[0];

    // Handle new thumbnail
    if (newThumbnail) {
      if (resume.thumbnailLink) {
        const oldThumbnail = path.join(
          uploadsFolder,
          path.basename(resume.thumbnailLink)
        );
        if (fs.existsSync(oldThumbnail)) {
          fs.unlinkSync(oldThumbnail);
        }
      }
      resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
    }

    // Handle new profile image
    if (newProfileImage) {
      if (resume.profileInfo?.profilePreviewUrl) {
        const oldProfile = path.join(
          uploadsFolder,
          path.basename(resume.profileInfo.profilePreviewUrl)
        );
        if (fs.existsSync(oldProfile)) {
          fs.unlinkSync(oldProfile);
        }
      }
      resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
    }

    await resume.save();

    res.status(200).json({
      message: "Images uploaded successfully",
      thumbnailLink: resume.thumbnailLink,
      profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
    });
  } catch (err) {
    console.error("Failed to upload images:", err);
    res.status(400).json({
      message: "Failed to upload images",
      error: err.message,
    });
  }
};
