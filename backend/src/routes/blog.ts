import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables:{
    userId: string
  }
}>();

blogRouter.use("/*",async (c, next)=>{
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  const token = jwt.split(" ")[1];
  const payload = await verify(token, c.env.JWT_SECRET);
  if (!payload) {
    c.status(401);
    return c.json({ error: "unauthorized" });
  }
  c.set("userId", payload.id);
  await next(); 
})

blogRouter.post("/", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.put(" /", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("/:id", (c) => {
  return c.text("Hello Hono!");
});

blogRouter.get("/bulk", (c) => {
  return c.text("Hello Hono!");
});

export default blogRouter;