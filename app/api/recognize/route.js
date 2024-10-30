import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export async function POST(req) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ message: "No image data provided" }, { status: 400 });
        }

        // Remove base64 prefix and decode the image
        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
        const imageBuffer = Buffer.from(base64Data, 'base64');

        // Define the path to save the image outside the public directory
        const imagesDir = path.join(process.cwd(), 'images');
        const filePath = path.join(imagesDir, 'captured_image.png');

        // Ensure the 'images' directory exists
        if (!fs.existsSync(imagesDir)) {
            fs.mkdirSync(imagesDir, { recursive: true });
        }

        // Write the image file in binary format
        fs.writeFileSync(filePath, imageBuffer);
        console.log(`Image saved at ${filePath}`);

        // Call the Python Flask backend
        const pythonResponse = await fetch('http://localhost:5000/recognize', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ imagePath: filePath })  // Use absolute path
        });

        if (!pythonResponse.ok) {
            const errorText = await pythonResponse.text();
            console.error("Error response from Python backend:", errorText);
            return NextResponse.json({ message: 'Recognition service error.' }, { status: 500 });
        }

        const result = await pythonResponse.json();
        return NextResponse.json({ message: result.message, faces: result.faces }, { status: 200 });

    } catch (error) {
        console.error("Error processing request: ", error);
        return NextResponse.json({ message: 'Server error.' }, { status: 500 });
    }
}
