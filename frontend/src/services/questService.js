import api from "./api";


export const createQuest = async (questData) => {

    const response = await api.post(
        "/quests",
        questData
    );

    return response.data;
};


export const getMyQuests = async () => {

    const response = await api.get(
        "/quests"
    );

    return response.data;
};


export const deleteQuest = async (questId) => {

    const response = await api.delete(
        `/quests/${questId}`
    );

    return response.data;
};