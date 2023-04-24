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

const getPosts = async () => {
    const res = await fetch("/api/user/getPosts");
    const data = await res.json();
    return data;
};

export async function getServerSideProps() {
    // var requestOptions = {
    //     method: "GET",
    //     redirect: "follow",
    // };
    const base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://blogger-uuy.vercel.app";

    const res = await fetch(base_url + "/api/user/getPosts");
    const data = await res.json();
    const { posts } = data;
    return {
        props: {
            posts,
        },
    };
}
