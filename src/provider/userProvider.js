import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
// import { getUserInfoFromToken } from "@lib/authSession";

import Cookies from "js-cookie";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken, loading] = useCookie("user-token");
    const [user, setUser] = useCookie("user-data");

    const router = useRouter();
    const { route: path } = router;

    useEffect(() => {
        if (!loading) {
            if (!user && path !== "/signUp") router.replace("/login");
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
        try {
            setCookie(JSON.parse(data));
        } catch {
            setCookie(data);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            if (!cookie) {
                Cookies.remove(key);
            } else {
                const CookieValue =
                    typeof cookie === "string"
                        ? cookie
                        : JSON.stringify(cookie);

                Cookies.set(key, CookieValue);
            }
        }
    }, [cookie]);

    return [cookie, setCookie, loading];
};
