import React, { useRef, useState } from 'react';

export default function Home() {
    const videoRef = useRef(null);
    const [imageData, setImageData] = useState(null);
    const [response, setResponse] = useState(null);
    const [recognizedFaces, setRecognizedFaces] = useState([]);  // Ensure initialized as an empty array

    // Start the webcam stream
    const startVideo = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoRef.current.srcObject = stream;
            })
            .catch(err => console.error("Error accessing webcam: ", err));
    };

    // Capture the image from the webcam
    const captureImage = () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL("image/png");
        setImageData(image);
    };

    // Send the captured image to the backend for recognition
    const recognizeImage = async () => {
        if (!imageData) {
            alert("Capture an image first!");
            return;
        }

        try {
            const res = await fetch('/api/recognize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ image: imageData })
            });

            const result = await res.json();
            setResponse(result.message); // Set the message (like "Faces recognized")

            // Ensure the faces data is an array, even if empty or null
            const facesArray = Array.isArray(result.faces) ? result.faces : [];
            setRecognizedFaces(facesArray);  // Safely set the recognizedFaces state
        } catch (error) {
            console.error("Error recognizing image:", error);
            setResponse("Recognition failed.");
            setRecognizedFaces([]);  // Set to empty array on error
        }
    };

    return (
        <div>
            <h1>Webcam Face Recognition</h1>
            <video ref={videoRef} autoPlay></video>
            <div>
                <button onClick={startVideo}>Start Webcam</button>
                <button onClick={captureImage}>Capture Image</button>
                <button onClick={recognizeImage}>Recognize</button>
            </div>

            {response && <p>{response}</p>} {/* Display the message */}

            {recognizedFaces.length > 0 && (
                <div>
                    <h2>Recognized Faces:</h2>
                    <ul>
                        {recognizedFaces.map((face, index) => (
                            <li key={index}>
                                <strong>Name:</strong> {face.name} <br />
                                <strong>Confidence:</strong> {face.confidence} <br />
                                <strong>Position:</strong> x: {face.position.x}, y: {face.position.y}, w: {face.position.w}, h: {face.position.h}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
