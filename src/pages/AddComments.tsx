import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

interface CommentInput {
  body: string;
  postId: number;
  userId: number;
}

const addComment = async (data: CommentInput) => {
  return await axios.post("/comments/add", data);
};

const AddComment = () => {
  const [comment, setComment] = useState("");
  const [userId, setUserId] = useState(1);
  const [postId, setPostId] = useState(1);
  const navigate = useNavigate();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: addComment,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    mutate({ body: comment, userId, postId });
  };

  if (isSuccess) {
    navigate("/comments", { replace: true });
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-4">Add Comment</h2>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-1">User ID</label>
          <input
            type="number"
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-1">Post ID</label>
          <input
            type="number"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 font-medium mb-1">Your Comment</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-around">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
          >
            {isPending ? "Adding..." : "Add Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddComment;