import CardBlog from "@/components/Cardblog";
import { useUser } from "@/provider/userProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
    const data = [
        { title: "blog 1", description: "lorem ipsum" },
        { title: "blog 1", description: "lorem ipsum" },
        { title: "blog 1", description: "lorem ipsum" },
    ];

    const { user, setUser } = useUser();

    return (
        <>
            {data.map(({ title, description }, index) => (
                <CardBlog key={index} title={title} description={description} />
            ))}
        </>
    );
}
