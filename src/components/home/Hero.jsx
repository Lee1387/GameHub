import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, UserPlus, Sparkles } from "lucide-react";
import LoadingSpinner from "../ui/LoadingSpinner";
import ParticleBackground from "./ParticleBackground";

function Hero() {
  const [isLoading, setIsLoading] = useState(false);

  const handlePlayClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-cyan-50 py-32 overflow-hidden">
      <ParticleBackground particleCount={50} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
        <div className="animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="text-blue-600 animate-pulse" size={32} />
            <span className="text-lg font-medium text-blue-600">
              Welcome to the Future of Gaming
            </span>
            <Sparkles className="text-blue-600 animate-pulse" size={32} />
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-8">
            Welcome to <span className="text-gradient">GameHub</span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-16 max-w-4xl mx-auto leading-relaxed">
            Experience classic games with cutting-edge technology. Challenge AI
            opponents, compete with friends, and dominate the leaderboards in
            our collection of reimagined timeless games.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={handlePlayClick}
              className="btn-primary flex items-center gap-3 justify-center text-lg"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" color="white" />
              ) : (
                <Play size={24} />
              )}
              Start Playing Now
            </button>

            <Link
              to="/login"
              className="btn-secondary flex items-center gap-3 justify-center text-lg"
            >
              <UserPlus size={24} />
              Create Account
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
