import { Outlet } from "react-router-dom";

import "../components/Auth.css";

const AuthLayout = () => {

    return (
        <div className="auth-page">

            <div className="auth-hero">

                <div className="auth-logo">
                    <span>⚔</span>
                    LIFE RPG
                </div>


                <div className="hero-content">

                    <div className="hero-badge">
                        ★ YOUR REAL LIFE, YOUR ADVENTURE
                    </div>


                    <h1>
                        Level Up Your Real Life
                    </h1>


                    <p>
                        Turn everyday goals into quests,
                        earn XP, build streaks and progress
                        toward your dreams.
                    </p>


                    <div className="character-card">

                        <div className="character-placeholder">
                            🧙
                        </div>


                        <div className="character-info">

                            <span>
                                LIFE RPG ADVENTURER
                            </span>

                            <strong>
                                Level 1
                            </strong>


                            <div className="mini-xp">
                                <div className="mini-xp-fill"></div>
                            </div>


                            <small>
                                0 / 100 XP
                            </small>

                        </div>

                    </div>


                    <div className="quest-tip">

                        <span>!</span>


                        <div>

                            <strong>
                                Quest Tip
                            </strong>

                            <p>
                                Complete real-life tasks to
                                earn XP, level up and become
                                your best self.
                            </p>

                        </div>

                    </div>

                </div>

            </div>


            <div className="auth-form-section">

                <div className="auth-form-card">

                    <Outlet />

                </div>

            </div>

        </div>
    );
};

export default AuthLayout;