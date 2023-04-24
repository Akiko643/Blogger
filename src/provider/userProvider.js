import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfoFromToken, verifyToken } from "@lib/authSession";
import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken, loading] = useCookie("user-token");
    const [user, setUser] = useState(true);

    const router = useRouter();
    const { route: path } = router;

    useEffect(() => {
        if (!loading) {
            if (token) {
                const userData = getUserInfoFromToken(token);
                setUser(userData);
                // if(path === '/login' || path ==='/signUp')
            } else {
                if (path !== "/signUp") router.replace("/login");
            }
        }
    }, [token, loading, path]);

    return (
        <UserContext.Provider value={{ token, setToken, user, setUser }}>
            <div className="container">
                {path !== "/login" && path !== "/signUp" && <Navbar></Navbar>}

                {children}
            </div>
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export const useCookie = (key) => {
    const [cookie, setCookie] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const data = Cookies.get(key);
        setCookie(data);
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            if (cookie) Cookies.set(key, cookie);
            else Cookies.remove(key);
        }
    }, [cookie]);

    return [cookie, setCookie, loading];
};
