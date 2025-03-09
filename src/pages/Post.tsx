import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";

interface Post {
  id: number;
  title: string;
  body: string;
  tags: string[];
  thumbnail: string;
  reactions: Reaction;
  views: number;
  userId: number;
}

interface Reaction {
  likes: number;
  dislikes: number;
}

interface PostList {
  posts: Post[];
}

// Function to fetch posts from the API
const fetchPostList = async () => {
  return await axios.get<PostList>("/post");
};

// Skeleton Loader Component
const PostSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-lg"></div>
      <div className="w-2/3 h-6 bg-gray-300 rounded"></div>
      <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
    </div>
  );
};

// Main Post Component
const Post = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Post"],
    queryFn: fetchPostList,
  });
  const navigate = useNavigate();

  // Handle post click event
  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-6">Loading posts...</h2>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center">
          <h2 className="text-xl font-bold text-red-600 mb-6">Error fetching posts:</h2>
          <p>{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Post List</h1>
        <div className="space-y-8">
          {data?.data.posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-lg rounded-lg p-4 transition-all transform hover:scale-105 cursor-pointer"
              onClick={() => handlePostClick(post.id)}
            >
              <div className="flex flex-col">
                <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
                <p className="text-gray-600 mt-2">{post.body.slice(0, 100)}...</p>
                <div className="flex flex-wrap mt-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 text-gray-600">
                  <div className="flex space-x-3">
                    <span>{post.reactions.likes} Likes</span>
                    <span>{post.reactions.dislikes} Dislikes</span>
                  </div>
                  <div>{post.views} Views</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button 
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={() => navigate("./add")}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
        </svg>
      </button>
    </div>
  );
};

export default Post;