import {
    createContext,
    useContext,
    useState
} from "react";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [userData, setUserData] = useState(() => {

        const savedUser = localStorage.getItem("user");

        return savedUser
            ? JSON.parse(savedUser)
            : null;
    });


    const login = (newToken, user) => {

        localStorage.setItem(
            "token",
            newToken
        );

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        setToken(newToken);
        setUserData(user);
    };


    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setToken(null);
        setUserData(null);
    };


    return (
        <AuthContext.Provider
            value={{
                token,
                userData,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};