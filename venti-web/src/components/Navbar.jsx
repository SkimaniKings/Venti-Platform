// venti-web/src/components/Navbar.tsx
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/home", label: "🏠 Home" },
    { path: "/about", label: "ℹ️ About" },
    { path: "/chatrooms", label: "💬 Chatrooms" },
    { path: "/community", label: "🌍 Community" },
    { path: "/ai", label: "🤖 AI Assistant" },
    { path: "/vent", label: "🌿 Venting" },
    { path: "/support", label: "💚 Support" },
    { path: "/monetization", label: "💳 Premium" },
  ];

  return (
    <footer className="w-full bg-gradient-to-r from-indigo-50 via-white to-purple-50 shadow-lg rounded-t-2xl border-t border-gray-200 mt-6">
      <div className="flex justify-around items-center py-3 max-w-md mx-auto">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              location.pathname === item.path
                ? "bg-indigo-100 text-indigo-700 shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </footer>
  );
}
