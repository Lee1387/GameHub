import { Shield, Trophy, Zap, Users, Brain, Globe } from "lucide-react";
import { getStaggerDelay } from "../../utils/animations";

function Features() {
  const features = [
    {
      icon: Shield,
      title: "Guest & Account Play",
      description:
        "Play instantly as a guest or create an account to track progress and compete in rankings.",
      gradient: "from-blue-500 to-indigo-500",
    },
    {
      icon: Brain,
      title: "Advanced AI Opponents",
      description:
        "Challenge sophisticated AI that adapts to your skill level across multiple game types.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Trophy,
      title: "Global Leaderboards",
      description:
        "Compete globally and see how you rank against other players in each game.",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Multiplayer Battles",
      description:
        "Challenge friends and players worldwide in real-time competitive matches.",
      gradient: "from-green-500 to-teal-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Experience games with ultra-low latency and seamless performance.",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: Globe,
      title: "Cross Platform",
      description:
        "Play anywhere, anytime on any device with full synchronisation.",
      gradient: "from-red-500 to-rose-500",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20 animate-fadeIn">
          <h2 className="text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Why Choose <span className="text-gradient">GameHub</span>?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Built with modern technology for the ultimate gaming experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="card animate-slideUp hover:rotate-1 transition-transform duration-300"
              style={{ animationDelay: getStaggerDelay(index % 3) }}
            >
              <div
                className={`bg-gradient-to-r ${feature.gradient} p-4 rounded-2xl w-20 h-20 mx-auto mb-8 flex items-center justify-center animate-float`}
              >
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-display font-semibold mb-4 text-center text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
