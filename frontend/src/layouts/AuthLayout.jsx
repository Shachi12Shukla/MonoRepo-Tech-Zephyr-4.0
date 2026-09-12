import { Outlet } from "react-router-dom";
import "../pages/Auth.css";

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
                        ★ YOUR ADVENTURE BEGINS
                    </div>

                    <h1>Begin Your Adventure</h1>

                    <p>
                        Turn your everyday goals into quests,
                        earn XP and level up your real life.
                    </p>

                    <div className="character-card">

                        <div className="character-placeholder">
                            🧙
                        </div>

                        <div className="character-info">

                            <span>NEW ADVENTURER</span>

                            <strong>Level 1</strong>

                            <div className="mini-xp">
                                <div className="mini-xp-fill"></div>
                            </div>

                            <small>0 / 100 XP</small>

                        </div>

                    </div>

                    <div className="quest-tip">

                        <span>!</span>

                        <div>

                            <strong>Quest Tip</strong>

                            <p>
                                Complete real-life tasks to earn XP,
                                level up and become your best self.
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