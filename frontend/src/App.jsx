import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import CreateTask from "./pages/Admin/CreateTask";
import Dashboard from "./pages/Admin/Dashboard";
import ManageTasks from "./pages/Admin/ManageTasks";
import ManageUsers from "./pages/Admin/ManageUsers";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import UserDashboard from "./pages/User/UserDashboard";
import MyTasks from "./pages/User/MyTasks";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
import PrivateRoute from "./routes/PrivateRoute";
import UserProvider, { UserContext } from "./context/UseContext.jsx";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ResetPass from "./pages/Auth/ResetPass.jsx";



function App() {
  return (
    <UserProvider>
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/reset-pass" element={<ResetPass/>}/>

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/tasks" element={<ManageTasks />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/users" element={<ManageUsers />} />
        </Route>

        {/* User Routes */}
        <Route element={<PrivateRoute allowedRoles={["member"]} />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/tasks" element={<MyTasks />} />
          <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
        </Route>

        <Route path="/" element={<Root />} />

      </Routes>
    </Router>
    <Toaster toastOptions={{className:"",
      style:{
        fontSize:"13px",
      }
    }}>

    </Toaster>
    </UserProvider>
  );
}

const Root = () => {
  const { user, loading } = useContext(UserContext);

  console.log("⚡ Root render");
  console.log("➡ loading:", loading);
  console.log("➡ user:", user);
   
  if (loading) return null;
  
  if(!user) return <Navigate to="/login" />

  console.log(user)
  if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
  if (user.role === "member") return <Navigate to="/user/dashboard" />;

  return <Navigate to="/login" />; 
};



export default App;

