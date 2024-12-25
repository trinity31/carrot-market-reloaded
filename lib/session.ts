import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessonContent {
    id?: number
}

export default async function getSession() {
    // 사용자 쿠키를 가져오거나 생성
    const cookie = await getIronSession<SessonContent>(await cookies(), {
      cookieName: "delicious-karrot",
      password: process.env.COOKIE_PASSWORD!,
    });
    return cookie;
}