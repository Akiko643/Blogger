import { useUser } from "@/provider/userProvider";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const signUpUser = async ({ email, password, passwordRepeat, role }) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        email,
        password,
        passwordRepeat,
        role,
    });

    var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
    };

    let data = await fetch("/api/signUp", requestOptions);
    return data;
};

const SignUp = () => {
    const roles = ["normal user", "admin"];
    const [userData, setUserData] = useState({
        role: roles[0],
        email: "",
        password: "",
        passwordRepeat: "",
    });

    const { token, setToken } = useUser();
    const router = useRouter();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const form = e.currentTarget;
            if (form.checkValidity() === true) {
                const response = await signUpUser(userData);
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
                <title>Sign Up</title>
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
                <Form.Group
                    className="mb-3"
                    controlId="formBasicRepeatPassword"
                >
                    <Form.Label>Repeat Password</Form.Label>
                    <Form.Control
                        required
                        defaultValue={userData.passwordRepeat}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                passwordRepeat: e.target.value,
                            })
                        }
                        type="password"
                        placeholder="Repeat your password"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please repeat your password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select your role</Form.Label>
                    <Form.Select
                        defaultValue={userData.role}
                        onChange={(e) => {
                            setUserData({
                                ...userData,
                                role: e.target.value,
                            });
                        }}
                    >
                        {roles.map((single_role, index) => (
                            <option key={index}>{single_role}</option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <div>
                    <Link href="/login">Login</Link>
                </div>
            </Form>
        </div>
    );
};

export default SignUp;
