import { NextResponse } from "next/server";


export async function GET(request) {
    try {

        return NextResponse.json({ world: "hello" });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to get users" });
    }
}