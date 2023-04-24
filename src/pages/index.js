import CardBlog from "@/components/Cardblog";
import { useUser } from "@/provider/userProvider";

export default function Home({ posts }) {
    const { user, setUser } = useUser();

    return (
        <>
            {posts.length > 0 ? (
                posts.map((postData, index) => (
                    <CardBlog key={index} postData={postData} />
                ))
            ) : (
                <div>No posts to show.</div>
            )}
        </>
    );
}

export async function getServerSideProps() {
    // var requestOptions = {
    //     method: "GET",
    //     redirect: "follow",
    // };

    const res = await fetch("http://localhost:3000/api/user/getPosts");
    const data = await res.json();
    console.log(data);
    const { posts } = data;
    return {
        props: {
            posts,
        },
    };
}
