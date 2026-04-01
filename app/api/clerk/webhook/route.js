import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        return Response.json({ error: "No webhook secret" }, { status: 400 });
    }

    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return Response.json({ error: "Missing svix headers" }, { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;

    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch (err) {
        return Response.json({ error: "Invalid signature" }, { status: 400 });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        await inngest.send({ name: "clerk/user.created", data: evt.data });
    }
    if (eventType === "user.updated") {
        await inngest.send({ name: "clerk/user.updated", data: evt.data });
    }
    if (eventType === "user.deleted") {
        await inngest.send({ name: "clerk/user.deleted", data: evt.data });
    }

    return Response.json({ success: true });
}