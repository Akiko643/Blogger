import { useUser } from "@/provider/userProvider";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
    const { setToken, user, setUser } = useUser();
    const [toggle, setToggle] = useState(false);
    const logOut = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <div className="navbar-style">
            <div className="my-dropdown">
                <div
                    className="dropdown-head"
                    onClick={() => setToggle(!toggle)}
                >
                    {user?.email}
                </div>
                {toggle && (
                    <div className="dropdown-elements-container">
                        {user?.role === "admin" && (
                            // <div className="dropdown-element">
                            <Link className="dropdown-element" href="/admin">
                                admin page
                            </Link>
                            // </div>
                        )}
                        {/* <div className="dropdown-element"> */}
                        <Link className="dropdown-element" href="/addpost">
                            Add post
                        </Link>
                        {/* </div> */}
                        <div className="dropdown-element" onClick={logOut}>
                            Log out
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
