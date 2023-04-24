import parse from "html-react-parser";

const Details = ({ content }) => {
    return (
        <>
            <div className="ProseMirror">{parse(content)}</div>
        </>
    );
};

export default Details;
