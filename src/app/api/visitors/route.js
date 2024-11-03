import { connectDb } from "@/helper/db";
import visitor from "@/model/visitor";
import moment from "moment-timezone";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {

        const today = moment().tz('Asia/Kolkata');
        const specificDate = moment(today.format('YYYY-MM-DD'), 'YYYY-MM-DD');
        const startOfSpecificDate = specificDate.clone().startOf('day');
        const endOfSpecificDate = specificDate.clone().endOf('day');

        await connectDb();

        const totalVisit = await visitor.findOneAndUpdate(
            { createdAt: { $gte: startOfSpecificDate.toDate(), $lte: endOfSpecificDate.toDate() } },
            { $inc: { visitorCounts: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ totalVisit });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to get users" });
    }
}