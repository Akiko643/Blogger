import Link from "next/link";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const getTitleFromContent = (content) => {
    const startIndex = content.indexOf("<h2>");
    const endIndex = content.indexOf("</h2>");
    return content.slice(startIndex + 4, endIndex);
};

const CardBlog = ({ postData }) => {
    const { _id, post, content, viewCount } = postData;

    const [title, setTitle] = useState(getTitleFromContent(content));
    return (
        <Card style={{ width: "18rem", marginTop: "12px" }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>viewCount: {viewCount}</Card.Text>
                <Link href={`/post/${_id}`}>
                    <Button variant="primary">read more...</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CardBlog;
