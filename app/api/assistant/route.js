import { NextResponse } from 'next/server';
import { BardAPI } from 'bard-api-node';

export async function POST(req) {
    try {
        const { message } = await req.json(); // Ensure we're reading the JSON body

        // Initialize BardAPI object
        const bard = new BardAPI();
        const apiKey = 'YOUR_API_KEY'; // Store your API key in an environment variable

        // Initialize chat with API key
        await bard.initializeChat(apiKey);

        // Send the query to Bard
        const response = await bard.getBardResponse(message);

        // Here, let's assume the AI can generate CSV-like responses for timetable generation queries
        const csvResponse = response.text;

        // Send back the CSV-like data as JSON
        return NextResponse.json({ response: csvResponse }, { status: 200 });
    } catch (error) {
        console.error("Error processing Bard API request:", error);
        return NextResponse.json({ error: 'Failed to process the request.' }, { status: 500 });
    }
}
