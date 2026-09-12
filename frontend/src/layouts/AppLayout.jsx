import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "../components/appLayout.css";

const AppLayout = () => {

    const { userData, logout } = useAuth();

    return (
        <div className="app-layout">

            {/* Sidebar */}

            <aside className="sidebar">

                <div className="sidebar-logo">
                    <span>⚔</span>
                    LIFE RPG
                </div>


                <nav className="sidebar-nav">

                    <NavLink
                        to="/home"
                        className="sidebar-link"
                    >
                        <span>🏠</span>
                        Home
                    </NavLink>


                    <NavLink
                        to="/quests"
                        className="sidebar-link"
                    >
                        <span>📜</span>
                        Quests
                    </NavLink>


                    <NavLink
                        to="/character"
                        className="sidebar-link"
                    >
                        <span>🧙</span>
                        Character
                    </NavLink>


                    <NavLink
                        to="/inventory"
                        className="sidebar-link"
                    >
                        <span>🎒</span>
                        Inventory
                    </NavLink>


                    <NavLink
                        to="/shop"
                        className="sidebar-link"
                    >
                        <span>🛒</span>
                        Shop
                    </NavLink>


                    <NavLink
                        to="/history"
                        className="sidebar-link"
                    >
                        <span>📖</span>
                        History
                    </NavLink>

                </nav>


                {/* Profile */}

                <div className="sidebar-profile">

                    <div className="profile-avatar">
                        🧙
                    </div>


                    <div className="profile-info">

                        <strong>
                            {userData?.firstName || "Hero"}
                        </strong>

                        <span>
                            Level 1
                        </span>

                    </div>


                    <button
                        className="logout-button"
                        onClick={logout}
                    >
                        ↪
                    </button>

                </div>

            </aside>


            {/* Main Content */}

            <main className="app-main">

                <Outlet />

            </main>

        </div>
    );
};

export default AppLayout;