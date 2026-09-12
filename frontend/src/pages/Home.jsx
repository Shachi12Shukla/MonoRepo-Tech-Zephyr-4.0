import { useAuth } from "../context/AuthContext";

import "../components/home.css";


const Home = () => {

    const { userData } = useAuth();


    return (
        <div className="home-page">

            {/* =========================
                HEADER
            ========================= */}

            <div className="home-header">

                <div>
                    <p className="home-eyebrow">
                        YOUR ADVENTURE
                    </p>

                    <h1>
                        Welcome back,{" "}
                        {userData?.firstName || "Hero"}! ⚔
                    </h1>

                    <p className="home-subtitle">
                        Ready to complete today's quests?
                    </p>
                </div>


                <div className="level-badge">
                    <span>LEVEL</span>
                    <strong>1</strong>
                </div>

            </div>


            {/* =========================
                CHARACTER / XP CARD
            ========================= */}

            <div className="player-card">

                <div className="player-avatar">
                    🧙
                </div>


                <div className="player-details">

                    <div className="player-name-row">

                        <div>
                            <span className="player-label">
                                CURRENT ADVENTURER
                            </span>

                            <h2>
                                {userData?.username || "Hero"}
                            </h2>
                        </div>

                        <span className="xp-text">
                            0 / 100 XP
                        </span>

                    </div>


                    <div className="xp-bar">

                        <div className="xp-fill"></div>

                    </div>


                    <div className="xp-footer">

                        <span>
                            0 XP earned
                        </span>

                        <span>
                            100 XP to Level 2
                        </span>

                    </div>

                </div>

            </div>


            {/* =========================
                STATS
            ========================= */}

            <div className="section-heading">

                <h2>
                    Character Stats
                </h2>

                <span>
                    BUILD YOURSELF
                </span>

            </div>


            <div className="stats-grid">

                <div className="stat-card">

                    <div className="stat-icon">
                        💪
                    </div>

                    <div>
                        <span>STRENGTH</span>
                        <strong>1</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        🧠
                    </div>

                    <div>
                        <span>INTELLECT</span>
                        <strong>1</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        ⚡
                    </div>

                    <div>
                        <span>AGILITY</span>
                        <strong>1</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        ❤️
                    </div>

                    <div>
                        <span>HEALTH</span>
                        <strong>1</strong>
                    </div>

                </div>


                <div className="stat-card">

                    <div className="stat-icon">
                        📖
                    </div>

                    <div>
                        <span>WISDOM</span>
                        <strong>1</strong>
                    </div>

                </div>

            </div>


            {/* =========================
                LOWER SECTION
            ========================= */}

            <div className="home-columns">


                {/* TODAY'S QUESTS */}

                <section className="quests-preview">

                    <div className="section-heading">

                        <div>
                            <h2>
                                Today's Quests
                            </h2>

                            <span>
                                COMPLETE TO EARN XP
                            </span>
                        </div>

                    </div>


                    <div className="empty-quests">

                        <div className="empty-icon">
                            📜
                        </div>

                        <h3>
                            No quests yet
                        </h3>

                        <p>
                            Create your first quest and
                            start earning XP.
                        </p>

                        <button>
                            + CREATE QUEST
                        </button>

                    </div>

                </section>


                {/* STREAK */}

                <section className="streak-card">

                    <div className="streak-header">

                        <div>
                            <span>
                                CURRENT STREAK
                            </span>

                            <h2>
                                0 DAYS
                            </h2>
                        </div>

                        <div className="streak-icon">
                            🔥
                        </div>

                    </div>


                    <div className="streak-days">

                        <div>
                            <span>M</span>
                            <strong>○</strong>
                        </div>

                        <div>
                            <span>T</span>
                            <strong>○</strong>
                        </div>

                        <div>
                            <span>W</span>
                            <strong>○</strong>
                        </div>

                        <div>
                            <span>T</span>
                            <strong>○</strong>
                        </div>

                        <div>
                            <span>F</span>
                            <strong>○</strong>
                        </div>

                        <div>
                            <span>S</span>
                            <strong>○</strong>
                        </div>

                        <div>
                            <span>S</span>
                            <strong>○</strong>
                        </div>

                    </div>


                    <p className="streak-message">
                        Complete a quest today to
                        start your streak!
                    </p>

                </section>

            </div>


            {/* =========================
                ROADMAP
            ========================= */}

            <section className="roadmap-card">

                <div className="roadmap-header">

                    <div>

                        <span>
                            YOUR JOURNEY
                        </span>

                        <h2>
                            Dream Roadmap
                        </h2>

                    </div>


                    <button>
                        SET DREAM
                    </button>

                </div>


                <div className="roadmap-line">

                    <div className="roadmap-point active">
                        <span>⚔</span>
                        <medium>LEVEL 1</medium>
                    </div>

                    <div className="roadmap-connector"></div>

                    <div className="roadmap-point">
                        <span>⭐</span>
                        <medium>LEVEL 40</medium>
                    </div>

                    <div className="roadmap-connector"></div>

                    <div className="roadmap-point">
                        <span>🏆</span>
                        <medium>LEVEL 80</medium>
                    </div>

                    <div className="roadmap-connector"></div>

                    <div className="roadmap-point">
                        <span>👑</span>
                        <medium>DREAM</medium>
                    </div>

                </div>

            </section>

        </div>
    );
};


export default Home;