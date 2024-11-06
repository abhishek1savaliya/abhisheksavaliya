import { connectDb } from "@/helper/db";
import social from "@/model/social";
import moment from "moment-timezone";
import { NextResponse } from "next/server";
import allSocialProfile from '../../../Data/profile.json'
moment.tz('Asia/Kolkata').format('ha z')

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

export async function GET(request) {
    try {
        await connectDb();

        const networkData = await social.find();
        if (networkData.length === 0) return NextResponse.json({ success: true, data: [] });

        const socialProfileNames = allSocialProfile.map(profile => profile.network);

        // Get the range of dates from the first available date up to the current date
        const firstDate = moment(networkData[0].date).tz('Asia/Kolkata');
        const currentDate = moment().tz('Asia/Kolkata');

        // Create a map with all dates up to current date and zero counts
        const dateMap = {};
        for (let date = firstDate.clone(); date.isSameOrBefore(currentDate); date.add(1, 'day')) {
            const formattedDate = date.format('DD-MM-YYYY dddd');
            dateMap[formattedDate] = { date: formattedDate, network: {} };
            socialProfileNames.forEach(profile => {
                dateMap[formattedDate].network[profile] = 0;
            });
        }

        // Populate dateMap with actual data from networkData
        networkData.forEach(entry => {
            const formattedDate = moment(entry.date).tz('Asia/Kolkata').format('DD-MM-YYYY dddd');
            const networkName = entry.network;
            dateMap[formattedDate].network[networkName] = entry.count;
        });

        // Convert dateMap to an array and sort it by date in descending order
        const response = Object.values(dateMap)
            .map(item => {
                // Sort the networks by count in descending order
                item.network = Object.entries(item.network)
                    .sort((a, b) => b[1] - a[1]) // Sort by count, b[1] > a[1] for descending
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {});
                return item;
            })
            .sort((a, b) => {
                const dateA = moment(a.date, 'DD-MM-YYYY dddd').toDate();
                const dateB = moment(b.date, 'DD-MM-YYYY dddd').toDate();
                return dateB - dateA;
            });

        return NextResponse.json({ success: true, data: response });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ message: "Failed to fetch network data" });
    }
}