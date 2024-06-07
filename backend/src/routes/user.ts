import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@dinesh4762/common-zod-type";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const {success} = signupInput.safeParse(body);
  if(!success){
    c.status(400);
    return c.json({error: "invalid inputs!"})
  }
  try {
    const userExists = await prisma.user.findUnique({
      where:{
        email: body.email
      }
    })
    if(userExists){
      c.status(400);
      return c.json({error: "email exists!"})
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    c.status(403);
    return c.json({ error: "error ocurred while signing in!" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  console.log(body);
  const {success} = signinInput.safeParse(body);
  if(!success){
    c.status(400);  
    return c.json({error: "invalid inputs!"})
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "please signUp first!" });
    }
    if (user.password !== body.password) {
      c.status(403);
      return c.json({ error: "password is incorrect!" });
    }
    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ token });
  } catch (error) {
    
  }
});

export default userRouter;