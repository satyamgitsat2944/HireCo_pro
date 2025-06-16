



import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, clearAllUserErrors } from "../store/slices/userSlice";
import { 
  LuMoveRight, 
  LuUser, 
  LuUserCog, 
  LuKey, 
  LuBriefcase, 
  LuList, 
  LuFileText, 
  LuLogOut 
} from "react-icons/lu";
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";
import "./dashboard.css";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("My Profile");
  const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    toast.success("Logged out successfully.");
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const dashboardComponents = {
    "My Profile": <MyProfile />,
    "Update Profile": <UpdateProfile />,
    "Update Password": <UpdatePassword />,
    "Job Post": user?.role === "Employer" ? <JobPost /> : null,
    "My Jobs": user?.role === "Employer" ? <MyJobs /> : null,
    "Applications": user?.role === "Employer" ? <Applications /> : null,
    "My Applications": user?.role === "Job Seeker" ? <MyApplications /> : null
  };

  const navItems = [
    { name: "My Profile", role: "All", icon: <LuUser /> },
    { name: "Update Profile", role: "All", icon: < LuUserCog /> },
    { name: "Update Password", role: "All", icon: <LuKey /> },
    { name: "Job Post", role: "Employer", icon: <LuFileText /> },
    { name: "My Jobs", role: "Employer", icon: <LuBriefcase /> },
    { name: "Applications", role: "Employer", icon: <LuList /> },
    { name: "My Applications", role: "Job Seeker", icon: <LuList /> },
    { name: "Logout", role: "All", icon: <LuLogOut />, action: handleLogout }
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavItemClick = (componentName, action) => {
    if (action) {
      action();
    } else {
      setActiveComponent(componentName);
    }
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container dark-blue-theme">
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={toggleSidebar}></div>
      
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h4>Manage Account</h4>
        </div>
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            (item.role === "All" || user?.role === item.role) && (
              <li key={item.name}>
                <button
                  onClick={() => handleNavItemClick(item.name, item.action)}
                  className={activeComponent === item.name ? "active" : ""}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
              </li>
            )
          ))}
        </ul>
      </aside>

      <main className="dashboard-content">
        <header className="dashboard-header">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            <LuMoveRight className={`toggle-icon ${sidebarOpen ? "open" : ""}`} />
          </button>
          <div className="header-content">
            <h1>Dashboard</h1>
            <p className="welcome-message">
              Welcome! <span>{user?.name || "User"}</span>
            </p>
          </div>
        </header>

        <div className="component-wrapper glassmorphic-card">
          {dashboardComponents[activeComponent] || <MyProfile />}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;