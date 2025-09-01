// venti-web/src/App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import About from "./pages/About";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/Chatroom";
import Navbar from "./components/Navbar";
import CommunityWall from "./pages/CommunityWall";
import AI from "./pages/AIAssistant";
import Venting from "./pages/VentingModes";
import SupportDirectory from "./pages/SupportDirectory";
import Monetization from "./pages/Monetization";

import { useParams } from "react-router-dom";

// Wrapper to include Navbar for specific routes
function LayoutWithNavbar({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const hideNavbarPaths = ["/"]; // paths where Navbar should be hidden
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
    </>
  );
}

function ChatRoomWrapper() {
  const { roomName } = useParams<{ roomName: string }>();
  if (!roomName) return <div>Invalid room</div>;
  return (
    <LayoutWithNavbar>
      <ChatRoom roomName={roomName} />
    </LayoutWithNavbar>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />

        <Route
          path="/home"
          element={
            <LayoutWithNavbar>
              <Home />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/about"
          element={
            <LayoutWithNavbar>
              <About />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/chatrooms"
          element={
            <LayoutWithNavbar>
              <ChatRooms />
            </LayoutWithNavbar>
          }
        />
        <Route path="/chatroom/:roomName" element={<ChatRoomWrapper />} />
        <Route
          path="/community"
          element={
            <LayoutWithNavbar>
              <CommunityWall />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/ai"
          element={
            <LayoutWithNavbar>
              <AI />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/vent"
          element={
            <LayoutWithNavbar>
              <Venting />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/support"
          element={
            <LayoutWithNavbar>
              <SupportDirectory />
            </LayoutWithNavbar>
          }
        />
        <Route
          path="/monetization"
          element={
            <LayoutWithNavbar>
              <Monetization />
            </LayoutWithNavbar>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
