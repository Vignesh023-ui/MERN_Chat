import React, { useState } from "react";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";

const ChatInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [selectedImg, setSelectedImg] = useState(null);

  const { selectedUser, sendMessage } = useChatStore();
  const { user } = useAuthStore();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (file && file.type.startsWith("image/")) {
      setImage(file);
      const objectURL = URL.createObjectURL(file);
      setSelectedImg(objectURL);
    } else {
      toast.error("Please select an image file.");
    }
  };

  const removeImage = () => {
    setImage(null);
    setSelectedImg(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim() && !image) return;

    try {
      const formData = new FormData();
      formData.append("text", text.trim());
      if (image) formData.append("image", image);

      setText("");
      setSelectedImg(null);
      setImage(null);

      // ? send Message
      await sendMessage(user._id, selectedUser._id, formData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-4 w-full">
      {selectedImg && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={selectedImg}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <label
            htmlFor="file-input"
            className={`sm:flex btn btn-circle ${
              selectedImg ? "text-emerald-600" : "text-zinc-400"
            }`}
          >
            <Image size={20} />
          </label>
          <input
            type="file"
            accept="image/*"
            id="file-input"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          className="sm:flex btn btn-primary pt-1 pr-1 btn-circle"
          disabled={!text.trim() && !image}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
