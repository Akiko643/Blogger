import { useUser } from "@/provider/userProvider";
import Link from "next/link";
import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const Navbar = () => {
    const { user, setUser } = useUser();

    if (!user) {
        return <></>;
    }

    const logOut = () => {
        setUser(null);
    };

    return (
        <div className="navbar-style">
            <DropdownButton id="dropdown-basic-button" title={user.username}>
                <Dropdown.Item>
                    <Link href="/addpost">Add Post</Link>
                </Dropdown.Item>
                <Dropdown.Item onClick={logOut}>Log out</Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default Navbar;
