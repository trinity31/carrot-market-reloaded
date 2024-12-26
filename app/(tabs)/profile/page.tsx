import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";


async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            },
        });
        return user;
    }
    notFound(); //session id 가 없거나 user 가 없는 경우 404 페이지 반환
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        await session.destroy();
        redirect("/");
    }
    return (
        <div>
            <h1>Welcome {user?.username}</h1>
            <form action={logOut}> <button>Log out</button></form>
        </div>
    );
}
