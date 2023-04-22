import { useUser } from "@/provider/userProvider";
import dynamic from "next/dynamic";
import { useState } from "react";
import Button from "react-bootstrap/Button";

const EditorBlock = dynamic(() => import("@/components/Editor"), {
    ssr: false,
});
const EditorJsRenderer = dynamic(
    () => import("@/components/EditorJsRenderer"),
    {
        ssr: false,
    }
);

const Home = () => {
    const [data, setData] = useState();
    const [toggle, setToggle] = useState(false);
    const { user, setUser } = useUser();

    const handleSubmitPost = async (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            data,
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

        fetch("http://localhost:3000/api/addPost", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
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
            {toggle ? (
                <>
                    <EditorJsRenderer holder="editor-preview" data={data} />
                    <Button
                        variant="outline-primary"
                        onClick={handleSubmitPost}
                    >
                        post
                    </Button>
                </>
            ) : (
                <EditorBlock
                    data={data}
                    onChange={setData}
                    holder="editorjs-container"
                />
            )}
        </div>
    );
};

export default Home;
