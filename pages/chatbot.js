import React, { useState } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import ChatInterface from '../components/ChatInterface';

const Chatbot = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-blue-700">AI-Powered Attendance System</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Webcam Capture Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Webcam Attendance</h2>
          <div className="flex flex-col items-center">
            <WebcamCapture />
            <p className="text-sm mt-4 text-gray-500">Ensure your face is clearly visible for accurate attendance capture.</p>
          </div>
        </div>

        {/* Chat Interface Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default Chatbot;