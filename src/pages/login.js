import { useUser } from "@/provider/userProvider";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import cookieCutter from "cookie-cutter";

const loginUser = async (email, password) => {
    try {
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

        console.log(email, password);

        let data = await fetch(
            "http://localhost:3000/api/login",
            requestOptions
        );
        const res = JSON.parse(await data.text());
        return res;
    } catch (err) {
        console.log(err);
    }
};

const Login = () => {
    const roles = ["normal user", "admin"];

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState(roles[0]);
    const { setUser } = useUser();
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === true) {
            const { token } = await loginUser(email, password);
            console.log(token);
            cookieCutter.set("user-token", token);
            setUser({ email, _id: "123", role });
        }
        setValidated(true);
    };

    return (
        <div className="center full-height">
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        required
                        defaultValue={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        defaultValue={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter your password.
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Select your role</Form.Label>
                    <Form.Select
                        defaultValue={role}
                        onChange={(e) => {
                            setRole(e.target.value);
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
            </Form>
        </div>
    );
};

export default Login;
