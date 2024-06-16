import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createPostInput,updatePostInput } from "@dinesh4762/common-zod-type";

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
    console.log(jwt);
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  // console.log(jwt)
  try {
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      console.log(payload)
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    // console.log(payload);
    c.set("userId", String(payload.id));
    await next();
  } catch (error) {
    c.status(411);
    return c.json({ error: "Sorry, you are not authorised!" });
  }
});

// create blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const { id,title, content } = await c.req.json();
  const {success} = createPostInput.safeParse({id,title,content});
  if(!success){
    c.status(400);
    return c.json({error: "invalid inputs!"})
  }
  const userId = c.get("userId");

  try {
    const blog = await prisma.blog.create({
      data: {
        id,
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
  const { id, title, content, published } = await c.req.json();
  const { success } = updatePostInput.safeParse({
    id,
    title,
    content,
    published
  });
  if (!success) { 
    c.status(400);
    return c.json({ error: "invalid inputs!" });
  }
  try {
    await prisma.blog.update({
      where:{
        id: id,
        authorId: userId
      },
      data: {
        title,
        content,
        published
      },
    });

    return c.text("updated!");
  } catch (error) {
    return c.json({ error: "Failed to update!" });
  }
});

blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        published: true,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ length: blogs.length, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    c.status(500);
    return c.json({ error: "Failed to fetch blogs" });
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
      select:{
        id:true,
        title: true,
        content: true,
        published:true,
        author:{
          select:{
            name: true
          }
        }
      }
    });
    if (!blog) {  
      throw new Error("404 Blog NOT FOUND!");
    }
    return c.json({ blog });
  } catch (error) {
    c.status(411);
    return c.json({ error});
  }
});
blogRouter.get("/drafts", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const userId = c.get("userId");
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: userId,
        published: false,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });
    return c.json({ length: blogs.length, blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    c.status(500);
    return c.json({ error: "Failed to fetch blogs" });
  }
});

export default blogRouter;
