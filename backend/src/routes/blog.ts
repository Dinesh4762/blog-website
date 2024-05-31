import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use("/*", async (c, next) => {
  // console.log("hello")
  const jwt = c.req.header("Authorization") || "";
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  // console.log(jwt)
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  // console.log(payload);
  c.set("userId", String(payload.id));
  await next();
});

blogRouter.post("/", async (c) => {
  console.log("hello hello");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { title, content } = await c.req.json();
  const userId = c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });
    return c.json({ id: blog.id });
  } catch (error) {
    c.status(409);
    return c.json({ error: "blog creation failed!" });
  }
});

blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const userId = c.get("userId");
  const { id, title, content } = await c.req.json();
  // even though content is empty, its not updating to undefined in db
  try {
     await prisma.blog.update({
      where: {
        id: id,
        authorId: userId,
      },
      data: {
        title,
        content,
      },
    });

    return c.text("updated!");
  } catch (error) {
    return c.json({error: "Failed to update!"})
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany();
    return c.json({ length: blogs.length, blogs });
  } catch (error) {
    c.status(411);
    return c.json({error: "Failed to fetch blogs"})
  }
});

blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogId = c.req.param("id");
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: blogId,
      },
    });
    if (!blog) {
      throw new Error("404 Blog NOT FOUND!");
    }
    return c.json({ blog });
  } catch (error: any) {
    c.status(404);
    return c.json({ error: error.message });
  }
});

export default blogRouter;
