import { connectDb } from "@/helper/db";
import social from "@/model/social";
import moment from "moment-timezone";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const { network } = await request.json();

        const today = moment().tz('Asia/Kolkata');
        const specificDate = moment(today.format('YYYY-MM-DD'), 'YYYY-MM-DD');
        const startOfSpecificDate = specificDate.clone().startOf('day');
        const endOfSpecificDate = specificDate.clone().endOf('day');

        await connectDb();

        const Network = await social.findOneAndUpdate(
            {
                network,
                createdAt: { $gte: startOfSpecificDate.toDate(), $lte: endOfSpecificDate.toDate() }
            },
            { $inc: { count: 1 } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ totalVisit: Network.count });

    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to update visit count" });
    }
}