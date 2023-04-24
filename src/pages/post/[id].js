import Post from "@/components/Post";
import { useRouter } from "next/router";
import { Button } from "react-bootstrap";

const PostPage = ({ post }) => {
    const { approved } = post;
    const router = useRouter();
    const { id } = router.query;

    const handleApprove = () => {
        var requestOptions = {
            method: "PATCH",
            redirect: "follow",
        };

        fetch(
            `http://localhost:3000/api/admin/approvePost?id=${id}`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

    return (
        <div>
            <Post postData={post} />;
            {!approved && (
                <Button variant="success" onClick={handleApprove}>
                    Approve
                </Button>
            )}
        </div>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    console.log("id", id);
    const res = await fetch(`http://localhost:3000/api/getPost?id=${id}`);
    const data = await res.json();
    const { post } = data;
    return {
        props: {
            post,
        },
    };
}

export default PostPage;
