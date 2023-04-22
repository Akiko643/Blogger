import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardBlog = ({ title, description }) => {
    return (
        <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{description}</Card.Text>
                <Button variant="primary">read more...</Button>
            </Card.Body>
        </Card>
    );
};

export default CardBlog;
