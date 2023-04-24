import CardBlog from "@/components/Cardblog";

export default function Posts({ posts }) {
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

export async function getServerSideProps(context) {
    const { role } = context.params;
    const base_url =
        process.env.NODE_ENV === "development"
            ? "http://localhost:3000"
            : "https://blogger-uuy.vercel.app";

    const fetchUrl = {
        admin: base_url + "/api/admin/post",
        normalUser: base_url + "/api/user/getPosts",
        // mypost: base_url +
    };

    const res = await fetch(fetchUrl[role]);
    const data = await res.json();
    const { posts } = data;
    return {
        props: {
            posts,
        },
    };
}
