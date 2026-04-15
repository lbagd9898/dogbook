import "./App.css";
import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import GitHubSignIn from "./pages/GitHubSignIn";
import Dashboard from "./pages/Dashboard";
import UserProfile from "./pages/UserProfile";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./AuthProvider";
import MyProfile from "./pages/MyProfile";
import Search from "./pages/Search";
import SinglePost from "./pages/SinglePost";
import FakeDashboard from "./pages/FakeDashboard";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Fully public — no auth redirect in either direction */}
        <Route path="/preview" element={<FakeDashboard />} />

        {/* Public routes — redirects to / if already logged in */}
        <Route element={<PublicRoute />}>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/github" element={<GitHubSignIn />} />
        </Route>

        {/* Private routes — redirects to / if not logged in */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/user/me" element={<MyProfile />} />
          <Route path="/post/:postId" element={<SinglePost />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
