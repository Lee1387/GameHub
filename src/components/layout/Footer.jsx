import { Gamepad2, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-primary-600 to-accent-500 p-2 rounded-lg">
                <Gamepad2 className="text-white" size={24} />
              </div>
              <span className="text-2xl font-display font-bold">GameHub</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              The ultimate destination for classic games with modern technology.
              Challenge AI, compete globally, and experience gaming like never
              before.
            </p>
            <div className="flex space-x-6">
              <a
                href="https://github.com/Lee1387"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer hover:scale-110 transform"
              >
                <Github size={24} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Games</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Tic Tac Toe
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Connect 4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Pong
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 GameHub. Built for gaming enthusiasts with ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
