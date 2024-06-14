import z from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    name: string;
}, {
    email: string;
    password: string;
    name: string;
}>;
export type SignupType = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export type SigninType = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    title: string;
    content: string;
}, {
    id: string;
    title: string;
    content: string;
}>;
export type CreatePostType = z.infer<typeof createPostInput>;
export declare const updatePostInput: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    published: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}, {
    id: string;
    title?: string | undefined;
    content?: string | undefined;
    published?: boolean | undefined;
}>;
export type UpdatePostType = z.infer<typeof updatePostInput>;
