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
      <section className="flex flex-col items-center text-center py-24 bg-gradient-to-l from-[#baeafc] via-[#a5b9f0] to-[#86ddf0] rounded-xl">
        <h1 className="text-5xl font-bold text-white mb-6">Welcome to Gisella's Website</h1>
        <p className="text-lg text-white max-w-xl">
          Dive into our exclusive collections, intriguing recipes, and thought-provoking articles tailored for you.
        </p>
      </section>
    </div>
  );
};

export default Home;