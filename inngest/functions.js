import { inngest } from "./client";
import User from "@/models/User";
import connectDB from "@/lib/db";

// Sync user creation from Clerk
export const syncUserCreation = inngest.createFunction(
    {
        id: "sync-user-from-clerk",
        triggers: [{ event: "clerk/user.created" }],
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";
        const email = email_addresses?.[0]?.email_address || "";
        await connectDB();
        await User.create({
            _id: id,
            name,
            email,
            imageUrl: image_url,
            cartItems: {},
        });
        return { success: true, userId: id };
    }
);

// Sync user update from Clerk
export const syncUserUpdation = inngest.createFunction(
    {
        id: "update-user-from-clerk",
        triggers: [{ event: "clerk/user.updated" }],
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        const name = `${first_name || ""} ${last_name || ""}`.trim() || "User";
        const email = email_addresses?.[0]?.email_address || "";
        await connectDB();
        await User.findByIdAndUpdate(id, { name, email, imageUrl: image_url });
        return { success: true, userId: id };
    }
);

// Sync user deletion from Clerk
export const syncUserDeletion = inngest.createFunction(
    {
        id: "delete-user-from-clerk",
        triggers: [{ event: "clerk/user.deleted" }],
    },
    async ({ event }) => {
        const { id } = event.data;
        await connectDB();
        await User.findByIdAndDelete(id);
        return { success: true, userId: id };
    }
);