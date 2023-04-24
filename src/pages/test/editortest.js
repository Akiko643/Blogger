import dynamic from "next/dynamic";
import React, { useState } from "react";

const Editor = dynamic(() => import("../components/editors/CK/CK"), { ssr: false });

const EditorTest = () => {
    const [content, setContent] = useState("");
    const [disabled, setDisabled] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission
    };

    return (
        <form onSubmit={handleSubmit}>
            {typeof window !== "undefined" && (
                <Editor content={content} setContent={setContent} />
            )}
            <button onClick={() => setDisabled(true)} type="submit">
                Submit
            </button>
        </form>
    );
};

export default EditorTest;
