import React from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CK = ({ content, setContent, disabled }) => {
    const handleEditorChange = (event, editor) => {
        const data = editor.getData();
        setContent(data);
    };

    return (
        <CKEditor
            editor={ClassicEditor}
            data={content}
            onChange={handleEditorChange}
            disabled={disabled}
        />
    );
};

export default CK;
