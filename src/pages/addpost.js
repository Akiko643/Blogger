import { useUser } from "@/provider/userProvider";
import Tiptap from "@/components/editors/tiptap/Tiptap";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Details from "@/components/editors/tiptap/Details";

const Home = () => {
    const [content, setContent] = useState("");
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useUser();

    const handleSubmitPost = async (e) => {
        setLoading(true);
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            content,
            authorId: user._id,
            approved: false,
            viewCount: 0,
        });

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("/api/user/addPost", requestOptions)
            .then((response) => response.text())
            .then(() => {
                alert("Successfully added");
                setContent("");
                setLoading(false);
                setToggle(false);
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <div>
            <Button
                variant="outline-secondary"
                onClick={() => setToggle(!toggle)}
            >
                {toggle ? "edit" : "preview"}
            </Button>

            <div className="container">
                {toggle ? (
                    <>
                        <Details content={content} />
                        <Button
                            variant="outline-primary"
                            onClick={handleSubmitPost}
                            disabled={loading}
                        >
                            post
                        </Button>
                    </>
                ) : (
                    <Tiptap setContent={setContent} content={content} />
                )}
            </div>
        </div>
    );
};

export default Home;
