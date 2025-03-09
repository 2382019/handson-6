import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { UseMutateFunction } from "@tanstack/react-query";

interface RecipeFormElementProps {
  isEdit: boolean;
  mutateFn: UseMutateFunction<any, Error, Recipe, unknown>;
  defaultInputData?: Recipe;
}

export type RecipeFormFields = {
  name: string;
  ingredients: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  instructions: string[];
};

export type Recipe = {
  name: string;
  ingredients: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  instructions: string[];
};

const ingredientOptions = ["Salt", "Sugar", "Flour", "Eggs", "Milk", "Butter", "Cheese", "Chicken", "Beef", "Fish", "Garlic", "Onion", "Pepper", "Olive Oil"];

const RecipeForm: React.FC<RecipeFormElementProps> = (props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<RecipeFormFields>();
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(props.defaultInputData?.ingredients || []);
  const [instructions, setInstructions] = useState<string[]>(props.defaultInputData?.instructions || []);

  useEffect(() => {
    if (props.defaultInputData) {
      setValue("name", props.defaultInputData.name);
      setValue("prepTimeMinutes", props.defaultInputData.prepTimeMinutes);
      setValue("cookTimeMinutes", props.defaultInputData.cookTimeMinutes);
      setValue("servings", props.defaultInputData.servings);
      setValue("difficulty", props.defaultInputData.difficulty);
      setValue("cuisine", props.defaultInputData.cuisine);
    }
  }, [props.defaultInputData]);

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((item) => item !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleInstructionChange = (index: number, value: string) => {
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);
  };

  const addInstruction = () => {
    setInstructions([...instructions, ""]);
  };

  const removeInstruction = (index: number) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const onSubmit: SubmitHandler<RecipeFormFields> = (data) => {
    if (props.isEdit && !confirm("Are you sure you want to update the recipe?")) {
      return;
    }
    props.mutateFn({ ...data, ingredients: selectedIngredients, instructions });
  };

  return (
    <form className="max-w-lg mx-auto bg-gray-100 p-6 rounded-lg shadow-md border border-gray-400" onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-5">{props.isEdit ? "Update Recipe" : "Create New Recipe"}</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-gray-800 font-medium mb-1" htmlFor="name">Recipe Title</label>
          <input className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500" type="text" id="name" {...register('name', { required: "Recipe title is required." })} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
      
        <div>
          <label className="block text-gray-800 font-medium mb-1">Select Ingredients</label>
          <div className="grid grid-cols-2 gap-3 mt-1">
            {ingredientOptions.map((ingredient) => (
              <label key={ingredient} className="flex items-center space-x-2">
                <input type="checkbox" checked={selectedIngredients.includes(ingredient)} onChange={() => handleIngredientChange(ingredient)} className="w-5 h-5 text-blue-600 border-gray-300 rounded" />
                <span className="text-gray-700">{ingredient}</span>
              </label>
            ))}
          </div>
        </div>
      
        <div>
          <label className="block text-gray-800 font-medium mb-1">Cooking Instructions</label>
          {instructions.map((instruction, index) => (
            <div key={index} className="flex space-x-2 mt-2">
              <input className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500" type="text" value={instruction} onChange={(e) => handleInstructionChange(index, e.target.value)} placeholder={`Step ${index + 1}`} />
              <button type="button" className="bg-red-600 text-white p-2 rounded-md" onClick={() => removeInstruction(index)}>✖</button>
            </div>
          ))}
          <button type="button" className="mt-2 bg-green-600 text-white px-4 py-2 rounded-md" onClick={addInstruction}>+ Add Step</button>
        </div>
      
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="prepTimeMinutes">Preparation Time (minutes)</label>
            <input className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500" type="number" id="prepTimeMinutes" {...register('prepTimeMinutes', { required: "This field is required." })} />
          </div>
          <div>
            <label className="block text-gray-800 font-medium mb-1" htmlFor="cookTimeMinutes">Cooking Time (minutes)</label>
            <input className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500" type="number" id="cookTimeMinutes" {...register('cookTimeMinutes', { required: "This field is required." })} />
          </div>
        </div>
      
        <div>
          <label className="block text-gray-800 font-medium mb-1" htmlFor="difficulty">Difficulty Level</label>
          <select className="w-full p-2 rounded-md border border-gray-300 focus:ring focus:ring-blue-500" id="difficulty" {...register('difficulty', { required: "This field is required." })}>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      
        <button type="submit" className="w-full mt-4 bg-green-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-md transition-all">
          {props.isEdit ? "Update Recipe" : "Create Recipe"}
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;