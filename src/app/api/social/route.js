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

        const { searchParams } = new URL(request.url);
        const day = searchParams.get('day');
        const month = searchParams.get('month');
        const year = searchParams.get('year');

        if (!day || !month || !year) {
            return NextResponse.json({ message: "Invalid request data: Missing day, month, or year" });
        }

        // Define the target date using the day, month, and year provided
        const targetDate = moment.tz(`${day}-${month}-${year}`, 'DD-MM-YYYY', 'Asia/Kolkata');

        await connectDb();

        const networkData = await social.find();

        // If there is no data in the database, return an empty structure with all counts set to 0
        if (networkData.length === 0) {
            // Get all available social profile names
            const socialProfileNames = allSocialProfile.map(profile => profile.network);

            // Create a default response for the requested date with all counts as 0
            const defaultResponse = {
                date: targetDate.format('DD-MM-YYYY dddd'),
                network: socialProfileNames.reduce((acc, profile) => {
                    acc[profile] = 0;
                    return acc;
                }, {}),
            };

            return NextResponse.json({ success: true, data: [defaultResponse] });
        }

        // Initialize the date range to start from 01-11-2024 or the earliest date in networkData
        const firstDate = networkData.length > 0
            ? moment.min(moment('01-11-2024', 'DD-MM-YYYY'), moment(networkData[0].date).tz('Asia/Kolkata'))
            : moment('01-11-2024', 'DD-MM-YYYY');

        const currentDate = moment().tz('Asia/Kolkata');
        const dateMap = {};
        const socialProfileNames = allSocialProfile.map(profile => profile.network);

        // Generate date map with default values for each social profile count
        for (let date = firstDate.clone(); date.isSameOrBefore(currentDate); date.add(1, 'day')) {
            const formattedDate = date.format('DD-MM-YYYY dddd');
            dateMap[formattedDate] = { date: formattedDate, network: {} };
            socialProfileNames.forEach(profile => {
                dateMap[formattedDate].network[profile] = 0;
            });
        }

        // Populate date map with counts from networkData
        networkData.forEach(entry => {
            const formattedDate = moment(entry.date).tz('Asia/Kolkata').format('DD-MM-YYYY dddd');
            const networkName = entry.network;
            dateMap[formattedDate].network[networkName] = entry.count;
        });

        // Convert dateMap to an array and find the requested date
        const response = Object.values(dateMap)
            .map(item => {
                item.network = Object.entries(item.network)
                    .sort((a, b) => b[1] - a[1])
                    .reduce((acc, [key, value]) => {
                        acc[key] = value;
                        return acc;
                    }, {});
                return item;
            })
            .filter(item => moment(item.date, 'DD-MM-YYYY dddd').isSame(targetDate, 'day')) // Filter by target date
            .sort((a, b) => {
                const dateA = moment(a.date, 'DD-MM-YYYY dddd').toDate();
                const dateB = moment(b.date, 'DD-MM-YYYY dddd').toDate();
                return dateB - dateA;
            });


        if (response.length === 0) {
            const defaultResponse = {
                date: targetDate.format('DD-MM-YYYY dddd'),
                network: socialProfileNames.reduce((acc, profile) => {
                    acc[profile] = 0;
                    return acc;
                }, {}),
            };

            return NextResponse.json({ success: true, data: [defaultResponse] });
        }

        return NextResponse.json({ success: true, data: response });

    } catch (err) {
        console.error("Error fetching or processing network data:", err);
        return NextResponse.json({ message: "Failed to fetch network data" });
    }
}
