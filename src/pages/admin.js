import CardBlog from "@/components/Cardblog";

export default function Admin({ posts }) {
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
    const res = await fetch("http://localhost:3000/api/admin/getPosts");
    const data = await res.json();
    const { posts } = data;
    return {
        props: {
            posts,
        },
    };
}
