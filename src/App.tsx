import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Carts from "./pages/Carts";
import Post from "./pages/Post";
import AddPost from "./pages/addPost";
import DetailPost from "./pages/DetailPost";
import Product from "./pages/Product";
import Recipes from "./pages/Recipes";
import AddRecipes from "./pages/AddRecipes";
import RecipesDetail from "./pages/RecipesDetail";
import EditRecipes from "./pages/EditRecipes";
import ProductDetail from "./pages/ProductDetail";
import Home from "./pages/Home";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Comments from "./pages/Comments";
import AddComments from "./pages/AddComments";
import DetailComments from "./pages/DetailComments";


const queryClient = new QueryClient()

function App() {
	const router = createBrowserRouter(createRoutesFromElements(
		<Route path="/" element={<RootLayout />}>
			<Route index element={<Home/>} />
			<Route path="product" element={<Product />} />
			<Route path="product/add" element={<AddProduct />} />
			<Route path="product/:id" element={<ProductDetail/>}/>
			<Route path="product/:id/edit" element={<EditProduct/>}/>
			<Route path="recipes" element={<Recipes />} />
			<Route path="/recipes/add" element={<AddRecipes/>} />
			<Route path="/recipes/:id" element={<RecipesDetail/>} />
			<Route path="/recipes/:id/edit" element={<EditRecipes/>} />
			<Route path="/posts/add" element={<AddPost/>} />
			<Route path="/posts/:id" element={<DetailPost/>} />
			<Route path="comments" element={<Comments/>} />
			<Route path="/comments/add" element={<AddComments/>} />
			<Route path="/comments/:id" element={<DetailComments/>} />
			<Route path="posts" element={<Post />} />
			<Route path="carts" element={<Carts />} />
		</Route>
	));
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</>
	)
}

export default App