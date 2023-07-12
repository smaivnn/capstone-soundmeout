import "./App.css";
import { Routes, Route ,useParams} from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Starting from "./pages/Starting";
import Main from "./pages/Main";
import Auth from "./pages/Auths";
import TopicWrapper from "./pages/TopicWrapper";
function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Starting />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main/*" element={<Main />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/topic/:id" element={<TopicWrapper />} />
        
      </Routes>
    </div>
  );
}

export default App;
