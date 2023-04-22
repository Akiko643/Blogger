//./components/EditorTools.js
import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import CheckList from "@editorjs/checklist";
import Quote from "@editorjs/quote";
export const EDITOR_TOOLS = {
    code: Code,
    header: Header,
    paragraph: Paragraph,
    checklist: {
        class: CheckList,
        inlineToolbar: true,
    },
    quote: {
        class: Quote,
        inlineToolbar: true,
        shortcut: "CMD+SHIFT+O",
        config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
        },
    },
};
