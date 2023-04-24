import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardBlog = ({ postData }) => {
    const { _id, post, content, viewCount } = postData;
    return (
        <Card style={{ width: "18rem" }}>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Body>
                <Card.Title>123</Card.Title>
                <Card.Text>viewCount: {viewCount}</Card.Text>
                <Link href={`/post/${_id}`}>
                    <Button variant="primary">read more...</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default CardBlog;
