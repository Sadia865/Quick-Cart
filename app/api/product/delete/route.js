import connectDB from "@/lib/db";
import Product from "@/models/Product";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req) {
    try {
        const { userId } = getAuth(req);
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { id } = await req.json();

        await connectDB();
        await Product.findByIdAndDelete(id);

        return NextResponse.json({ success: true, message: "Product deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}