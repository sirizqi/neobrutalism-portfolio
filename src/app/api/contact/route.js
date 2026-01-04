import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as z from "zod";

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
});

export async function POST(req) {
    try {
        const body = await req.json();

        // Validate
        const validated = contactSchema.parse(body);

        // Save to DB
        await prisma.contactSubmission.create({
            data: {
                name: validated.name,
                email: validated.email,
                message: validated.message,
            },
        });

        return NextResponse.json({ ok: true, message: "Saved" });
    } catch (error) {
        console.error("Contact API Error:", error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { ok: false, error: "Validation failed", details: error.errors },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { ok: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
