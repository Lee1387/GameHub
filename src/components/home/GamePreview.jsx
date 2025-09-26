import { Link } from "react-router-dom";
import { Grid3X3, Circle, Zap, ArrowRight } from "lucide-react";
import { formatNumber } from "../../utils/common";

function GamePreview() {
  const games = [
    {
      id: "tictactoe",
      name: "Tic Tac Toe",
      description: "Classic 3x3 strategy game with modern AI",
      icon: Grid3X3,
      gradient: "from-blue-500 to-blue-600",
      players: 1200,
    },
    {
      id: "connect4",
      name: "Connect 4",
      description: "Drop and connect four pieces to victory",
      icon: Circle,
      gradient: "from-red-500 to-red-600",
      players: 890,
    },
    {
      id: "pong",
      name: "Pong",
      description: "Retro paddle ball with physics engine",
      icon: Zap,
      gradient: "from-green-500 to-green-600",
      players: 650,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-20 animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Featured <span className="text-gradient">Games</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Choose from our collection of enhanced classic games
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 mb-16">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`game-card animate-slideUp stagger-${index + 1}`}
            >
              <div
                className={`bg-gradient-to-r ${game.gradient} p-6 rounded-2xl w-24 h-24 mx-auto mb-8 flex items-center justify-center animate-float shadow-2xl`}
              >
                <game.icon className="text-white" size={36} />
              </div>

              <h3 className="text-2xl font-display font-semibold mb-4 text-center text-gray-900 dark:text-white">
                {game.name}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 text-center mb-6 leading-relaxed">
                {game.description}
              </p>

              <div className="text-center mb-6">
                <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                  {formatNumber(game.players)}+ playing now
                </span>
              </div>

              <button className="btn-primary w-full flex flex-col items-center gap-1 group">
                <span>Play Now</span>
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="text-center animate-fadeIn">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 btn-secondary text-lg"
          >
            View All Games
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GamePreview;
