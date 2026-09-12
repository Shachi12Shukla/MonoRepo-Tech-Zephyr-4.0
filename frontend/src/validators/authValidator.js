import { z } from "zod";


export const signupSchema = z.object({

    firstName: z
        .string()
        .min(
            2,
            "First name must be at least 2 characters"
        ),

    lastName: z
        .string()
        .min(
            2,
            "Last name must be at least 2 characters"
        ),

    username: z
        .string()
        .min(
            3,
            "Username must be at least 3 characters"
        ),

    password: z
        .string()
        .min(
            6,
            "Password must be at least 6 characters"
        )
});


export const signinSchema = z.object({

    username: z
        .string()
        .min(
            1,
            "Username is required"
        ),

    password: z
        .string()
        .min(
            1,
            "Password is required"
        )
});