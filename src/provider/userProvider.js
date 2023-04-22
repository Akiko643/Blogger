import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser, loading] = useLocalStorage("user");
    let render = false;
    const router = useRouter();
    const { route: path } = router;

    useEffect(() => {
        // console.log("user", user);
        // if (!loading) {
        //     if (!user) {
        //         router.replace("/login");
        //     } else if (path === "/login") {
        //         if (window.history.state && window.history.state.idx > 0) {
        //             router.back();
        //         } else {
        //             router.replace("/");
        //         }
        //     }
        //     render = true;
        // }
        // return () => {
        //     console.log("clear ()");
        // };
    }, [user]);

    const show = !loading && (path === "/login") ^ (user ? true : false);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {/* {show ? (
                <div className="container">
                    <Navbar></Navbar> */}
            {children}
            {/* </div>
            ) : (
                <></>
            )} */}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

export const useLocalStorage = (key) => {
    const [state, setState] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem(key);
        setState(JSON.parse(data));
        setLoading(false);
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem(key, JSON.stringify(state));
        }
    }, [state]);

    return [state, setState, loading];
};
