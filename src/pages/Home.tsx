import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const productRef = useRef<HTMLDivElement>(null);

  const scrollToProduct = () => {
    productRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col space-y-20 bg-gray-50 min-h-screen p-6">
      <section className="flex flex-col items-center text-center py-24 bg-gradient-to-l from-[#FF6F61] via-[#6F86D6] to-[#3B86F0] rounded-xl">
        <h1 className="text-5xl font-bold text-white mb-6">Discover Amazing Things</h1>
        <p className="text-lg text-white max-w-xl">
          Dive into our exclusive collections, intriguing recipes, and thought-provoking articles tailored for you.
        </p>
      </section>

      <section
        ref={productRef}
        className="flex flex-col lg:flex-row gap-10 items-center p-8 bg-gray-200 rounded-xl"
      >
        <img
          className="rounded-lg w-full lg:w-1/3"
          src="https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Unique Product"
        />
        <div
          className="flex flex-col justify-center space-y-4 p-4 bg-white rounded-lg shadow-lg cursor-pointer transition hover:scale-105"
          onClick={() => navigate("/product")}
        >
          <h2 className="text-3xl font-extrabold text-[#FF6F61] hover:underline">Exclusive Product</h2>
          <p className="text-gray-800 indent-4">
            We offer a curated selection of top-notch products to enhance your daily activities. Discover innovative solutions designed for your comfort and satisfaction.
          </p>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row-reverse gap-10 items-center p-8 bg-gray-200 rounded-xl">
        <img
          className="rounded-lg w-full lg:w-1/4"
          src="https://images.unsplash.com/photo-1542010589005-d1eacc3918f2?q=80&w=2092&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Gourmet Recipes"
        />
        <div
          className="flex flex-col justify-center space-y-4 p-4 bg-white rounded-lg shadow-lg cursor-pointer transition hover:scale-105"
          onClick={() => navigate("/recipes")}
        >
          <h2 className="text-3xl font-extrabold text-[#FF6F61] hover:underline">Delicious Recipes</h2>
          <p className="text-gray-800 indent-4">
            Find practical and delightful recipe ideas to elevate your special moments. From healthy dishes to creative snacks, we have a variety to try at home.
          </p>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row gap-10 items-center p-8 bg-gray-200 rounded-xl">
        <img
          className="rounded-lg w-full lg:w-1/3"
          src="https://images.unsplash.com/photo-1476242906366-d8eb64c2f661?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Informative Articles"
        />
        <div
          className="flex flex-col justify-center space-y-4 p-4 bg-white rounded-lg shadow-lg cursor-pointer transition hover:scale-105"
          onClick={() => navigate("/post")}
        >
          <h2 className="text-3xl font-extrabold text-[#FF6F61] hover:underline">Insightful Articles</h2>
          <p className="text-gray-800 indent-4">
            Explore a variety of captivating articles, helpful tips, and the latest news in lifestyle, health, and technology. We provide the current information for your daily reference.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;