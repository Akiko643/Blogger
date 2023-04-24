import { Button } from "react-bootstrap";
import Details from "./editors/tiptap/Details";

const Post = ({ postData }) => {
    const { content, viewCount } = postData;
    return (
        <div className="container">
            <div>view count: {viewCount}</div>
            <Details content={content} />
        </div>
    );
};

export default Post;
