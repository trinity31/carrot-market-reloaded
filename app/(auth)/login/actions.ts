"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import { z } from "zod";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  return user !== null;
};

const formSchema = z.object({
  email: z.string().email().toLowerCase()
  .refine(checkEmailExists, "Email does not exist"),
  password: z
    .string({
      required_error: "Password is required",
    })
    //.min(PASSWORD_MIN_LENGTH)
    //.regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

type State = {
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
} | null;

export async function logIn(prevState: State, formData: FormData): Promise<State> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result =  await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    //Find a user with the email
    //If user is found, Check if the password is correct
    //If password is correct, log the user in and redirect to the home page
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      }
    })
    const ok = await bcrypt.compare(result.data.password, user!.password ?? "")
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: ["Password is incorrect"],
        },
      };
    }
  }
}