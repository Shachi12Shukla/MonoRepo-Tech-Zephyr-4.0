import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import {createQuest,getMyQuests,deleteQuest} from "../services/questService";

import "../components/quests.css";

const categories = [
    {
        value: "fitness",
        label: "Fitness",
        icon: "💪"
    },
    {
        value: "study",
        label: "Study",
        icon: "📚"
    },
    {
        value: "work",
        label: "Work",
        icon: "💼"
    },
    {
        value: "health",
        label: "Health",
        icon: "❤️"
    },
    {
        value: "personal",
        label: "Personal",
        icon: "🏠"
    },
    {
        value: "creativity",
        label: "Creativity",
        icon: "🎨"
    }
];

const Quests = () => {

    const [quests, setQuests] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "personal"
    });

    const loadQuests = async () => {
        try {

            const data = await getMyQuests();

            setQuests(data.quests);

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to load quests"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        loadQuests();
    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleCreateQuest = async (e) => {

        e.preventDefault();

        try {

            const data = await createQuest(formData);

            setQuests([
                data.quest,
                ...quests
            ]);

            setFormData({
                title: "",
                description: "",
                category: "personal"
            });

            setShowForm(false);

            toast.success("Quest created! ⚔️");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to create quest"
            );

        }

    };

    const handleDelete = async (questId) => {

        try {

            await deleteQuest(questId);

            setQuests(
                quests.filter(
                    (quest) => quest._id !== questId
                )
            );

            toast.success("Quest deleted");

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to delete quest"
            );

        }

    };

    const getCategory = (category) => {

        return categories.find(
            (item) => item.value === category
        );

    };

    return (
        <div className="quests-page">

            <div className="quests-header">

                <div>
                    <div className="page-eyebrow">
                        ⚔ YOUR ADVENTURE
                    </div>

                    <h1>Quests</h1>

                    <p>
                        Turn your real-life goals into
                        quests and earn rewards.
                    </p>
                </div>

                <button
                    className="create-quest-button"
                    onClick={() => setShowForm(!showForm)}
                >
                    {showForm
                        ? "✕ CLOSE"
                        : "+ CREATE QUEST"
                    }
                </button>

            </div>


            {showForm && (

                <form
                    className="quest-form"
                    onSubmit={handleCreateQuest}
                >

                    <div className="form-title">
                        <span>📜</span>
                        <div>
                            <h2>Create New Quest</h2>
                            <p>
                                Complete it in real life.
                                Earn XP in the game.
                            </p>
                        </div>
                    </div>


                    <div className="form-group">

                        <label>
                            Quest Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            placeholder="e.g. Study for 2 hours"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            placeholder="What do you need to accomplish?"
                            value={formData.description}
                            onChange={handleChange}
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >

                                {categories.map((category) => (

                                    <option
                                        key={category.value}
                                        value={category.value}
                                    >
                                        {category.icon}{" "}
                                        {category.label}
                                    </option>

                                ))}

                            </select>

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="submit-quest-button"
                    >
                        ⚔ CREATE QUEST
                    </button>

                </form>

            )}


            <div className="quest-section-header">

                <div>
                    <h2>My Quests</h2>

                    <span>
                        {quests.length} active quests
                    </span>
                </div>

            </div>


            {loading ? (

                <div className="quests-empty">
                    <div className="empty-icon">
                        ⏳
                    </div>

                    <h3>Loading quests...</h3>
                </div>

            ) : quests.length === 0 ? (

                <div className="quests-empty">

                    <div className="empty-icon">
                        📜
                    </div>

                    <h3>No quests yet</h3>

                    <p>
                        Create your first real-life quest
                        and begin your adventure.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                    >
                        + CREATE YOUR FIRST QUEST
                    </button>

                </div>

            ) : (

                <div className="quest-grid">

                    {quests.map((quest) => {

                        const category =
                            getCategory(quest.category);

                        return (

                            <div
                                className={`quest-card ${
                                    quest.completed
                                        ? "completed"
                                        : ""
                                }`}
                                key={quest._id}
                            >

                                <div className="quest-card-top">

                                    <div className="quest-category-icon">
                                        {category?.icon}
                                    </div>

                                </div>


                                <h3>
                                    {quest.title}
                                </h3>


                                {quest.description && (

                                    <p className="quest-description">
                                        {quest.description}
                                    </p>

                                )}


                                <div className="quest-rewards">

                                    <div>
                                        <span>✨</span>
                                        <strong>
                                            {quest.xpReward} XP
                                        </strong>
                                    </div>

                                    <div>
                                        <span>🪙</span>
                                        <strong>
                                            {quest.goldReward}
                                        </strong>
                                    </div>

                                </div>


                                <div className="quest-card-footer">

                                    <span>
                                        {category?.label}
                                    </span>

                                    <button
                                        className="delete-quest-button"
                                        onClick={() =>
                                            handleDelete(
                                                quest._id
                                            )
                                        }
                                    >
                                        🗑️
                                    </button>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </div>
    );
};

export default Quests;