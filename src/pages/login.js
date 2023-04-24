import { useUser } from "@/provider/userProvider";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const loginUser = async ({ email, password }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        email,
        password,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let data = await fetch("/api/login", requestOptions);
    return data;
};

const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });

    const { token, setToken } = useUser();
    const router = useRouter();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity() === true) {
                const response = await loginUser(userData);
                const data = JSON.parse(await response.text());
                if (response.status !== 200) throw new Error(data.message);

                const { token } = data;
                if (token) setToken(token);
                router.replace("/");
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="center full-height flex-column">
            <Head>
                <title>Login</title>
            </Head>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        defaultValue={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        type="email"
                        placeholder="Enter email"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter correct email.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        defaultValue={userData.password}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value,
                            })
                        }
                        type="password"
                        placeholder="Password"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your password.
                    </Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div>
                    <Link href="/signUp">Sign Up</Link>
                </div>
            </Form>
        </div>
    );
};

export default Login;
