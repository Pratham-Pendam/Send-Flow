import db from "@send-flow/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendVerificationEmail } from "utils/nodemailer";


/* ---------- SIGNUP ---------- */
// export const signup = async (
//   { email, password }: { email: string; password: string }
// ) => {
//   const exists = await db.user.findUnique({ where: { email } });
//   if (exists) throw new Error("User already exists");

//   const hash = await bcrypt.hash(password, 10);

//   const user = await db.user.create({
//     data: { email, password: hash }
//   });

//   return { id: user.id, email: user.email };
// };
/* ---------- SIGNUP WITH TOKEN GENERATION ---------- */
 // your email sender

export const signup = async ({
  userName,
  email,
  password,
}: {
  userName: string;
  email: string;
  password: string;
}) => {
  // 1️⃣ Check if user already exists
  const exists = await db.user.findUnique({ where: { email } });
  if (exists) throw new Error("User already exists");

  // 2️⃣ Hash the password
  const hash = await bcrypt.hash(password, 10);

  // 3️⃣ Create user in DB
  const user = await db.user.create({
    data: {
      userName,      // ✅ now accepts userName
      email,
      password: hash,
      emailVerified: false,
    },
  });

  // 4️⃣ Generate email verification token
  const emailToken = jwt.sign(
    { userId: user.id },
    process.env.EMAIL_TOKEN_SECRET!,
    { expiresIn: "30m" } // valid for 30 minutes
  );

  // 5️⃣ Send verification email
  await sendVerificationEmail(email, emailToken);

  // 6️⃣ Return response
  return { message: "Verification email sent", id: user.id, email: user.email, userName: user.userName };
};



/* ---------- SIGNIN ---------- */
export const signin = async (
  { email, password }: { email: string; password: string }
) => {
  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error("User not found");

  const valid = await bcrypt.compare(password, user.password!);
  if (!valid) throw new Error("Invalid password");

  return { id: user.id, email: user.email };
};


/* ---------- GOOGLE AUTH ---------- */
export const googleAuth = async (
  { email, name }: { email: string; name: string }
) => {
  const user = await db.user.findUnique({ where: { email } })
    ?? await db.user.create({
      data: { email, userName: name, password: null }
    });

  return { id: user.id, email: user.email };
};


export const getMeService = async (userId: string) => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      userName: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const verifyEmailService = async (token: string): Promise<string> => {
  try {
    const decoded = jwt.verify(
      token,
      process.env.EMAIL_TOKEN_SECRET!
    ) as { userId: string };

    await db.user.update({
      where: { id: decoded.userId },
      data: { emailVerified: true },
    });

    return "Email verified successfully";
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};