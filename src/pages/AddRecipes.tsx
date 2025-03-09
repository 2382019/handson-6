import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "../utils/AxiosInstance";
import RecipeForm, { Recipe } from "../components/RecipeForm";

const addRecipe = async (data: Recipe) => {
  return await axios.post("/recipes/add", data);
};

const AddRecipes = () => {
  const navigate = useNavigate();
  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: addRecipe,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/recipes", { replace: true });
    }
  }, [isSuccess, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="relative bg-white p-10 rounded-lg shadow-xl w-full max-w-md">
        {isPending && (
          <div className="absolute inset-0 bg-gray-300/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="flex items-center bg-white/90 px-6 py-4 rounded-lg shadow-lg">
              <span className="text-xl mr-4 text-gray-800">Adding Recipe...</span>
              <svg
                className="animate-spin h-6 w-6 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </div>
        )}
        <RecipeForm isEdit={false} mutateFn={mutate} />
      </div>
    </div>
  );
};

export default AddRecipes;