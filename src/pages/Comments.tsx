import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

interface Comment {
  id: number;
  body: string;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
}

interface CommentList {
  comments: Comment[];
}

const fetchComments = async () => {
  return await axios.get<CommentList>("/comments");
};

const CommentSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-16 bg-white rounded-lg"></div>
      <div className="w-2/3 h-6 bg-white rounded"></div>
      <div className="w-1/2 h-4 bg-white rounded"></div>
    </div>
  );
};

const Comments = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Comments"],
    queryFn: fetchComments,
  });
  const navigate = useNavigate();

  const handleCommentClick = (commentId: number) => {
    navigate(`/comments/${commentId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-6">Loading comments...</h2>
          <CommentSkeleton />
          <CommentSkeleton />
          <CommentSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-6">Error fetching comments:</h2>
          <p>{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Comments</h1>
        <div className="space-y-8">
          {data?.data.comments.map((comment) => (
            <div
              key={comment.id}
              className="flex space-x-4 cursor-pointer hover:bg-white transition-all rounded-lg p-4 shadow-sm"
              onClick={() => handleCommentClick(comment.id)}
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">{comment.user.fullName}</h2>
                <p className="text-gray-600 mt-1">{comment.body.slice(0, 100)}...</p>
                <div className="flex justify-between items-center mt-2 text-gray-600">
                  <span>{comment.likes} Likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        onClick={() => navigate("./add")}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  );
};

export default Comments;