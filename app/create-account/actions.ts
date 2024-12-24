"use server";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/
);

const checkUsernameIsUnique = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
}

const checkEmailIsUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
}

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be a string!",
        required_error: "Where is my username???",
      })
      .min(3, "Way too short!!!")
      //.max(10, "That is too looooong!")
      .trim()
      .toLowerCase()
     // .transform((username) => `🔥 ${username}`)
      .refine(
        (username) => !username.includes("potato"),
        "No potatoes allowed!"
      ).refine(checkUsernameIsUnique, "username is already taken"),
    email: z.string().email().toLowerCase()
      .refine(checkEmailIsUnique, "email is already taken"),
    password: z
      .string()
      .min(4),
      // .regex(
      //   passwordRegex,
      //   "Passwords must contain at least one UPPERCASE, lowercase, number and special characters #?!@$%^&*-"
      // ),
    confirm_password: z.string().min(4),
  })
  .superRefine(({ password, confirm_password }, ctx) => {
    if (password !== confirm_password) {
      ctx.addIssue({
        code: "custom",
        message: "Two passwords should be equal",
        path: ["confirm_password"],
      });
    }
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);
    //check if username and email is already taken
    //hash password and save user to edb
    //log the user in
    //redirect "/home"
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    console.log(user);
  }
}
