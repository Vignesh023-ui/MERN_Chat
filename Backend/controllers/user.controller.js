import User from "../modals/user.modal.js";

import memoryCache, { generateCacheKey } from "../utils/nodeCache.js";

import { uploadCloudinary, deleteCloudinary } from "../utils/cloudinary.js";

export const getChatUsers = async (req, res) => {
  const { id } = req.params;

  try {
    // ! Check cache for users
    const cacheKey = generateCacheKey("users", id);
    if (memoryCache.has(cacheKey)) {
      const userCache = memoryCache.get(cacheKey);
      return res.status(200).json({ success: true, users: userCache });
    }

    // ? Fetch users except cur User
    const users = await User.find({
      _id: { $ne: id },
    }).select("-password");

    // ! Set cache for users
    memoryCache.set(cacheKey, users);

    return res.status(200).json({ success: true, users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const uploadProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("-password");

    // ! Delete old profile
    if (user?.profile?.includes("res.cloudinary.com")) {
      await deleteProfile(user.profile);
    }

    // ? Upload new profile
    const b64 = Buffer.from(req.file?.buffer).toString("base64");
    const url = `data:${req.file?.mimetype};base64,${b64}`;

    // ! Upload to Cloudinary
    const uploadResponse = await uploadCloudinary(url);

    if (!uploadResponse || !uploadResponse.secure_url) {
      return res.status(500).json({ message: "Image upload failed" });
    }
    // ! Update user profile
    user.profile = uploadResponse.secure_url;

    // ! Save user
    await user.save();

    memoryCache.del(id);

    return res
      .status(200)
      .json({ success: true, user, message: "Profile Updated Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteProfile = async (imageURL) => {
  try {
    const [folderName, fileName] = imageURL.split("/").slice(-2);
    const publicId = `${folderName}/${fileName.split(".")[0]}`;

    await deleteCloudinary(publicId);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
