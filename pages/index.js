import React, { useState } from 'react';
import WebcamCapture from '../components/WebcamCapture';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from 'next/link'; // Import Link from Next.js
import 'tailwindcss/tailwind.css';

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState(null); // Holds parsed table data
  const [structuredResponse, setStructuredResponse] = useState(null); // Holds structured response for non-CSV data

  // Handle sending message to the API
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { sender: 'user', text: inputMessage + " IF answer is expected in table only give comma separated values"};
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    setInputMessage(''); // Clear input

    setLoading(true);
    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      const botMessage = { sender: 'bot', text: data.response || 'An error occurred' };

      // Check if the response is in CSV format
      if (data.response && data.response.includes(',')) {
        parseCSV(data.response); // Parse CSV response
      } else {
        parseStructuredResponse(data.response); // Handle structured non-CSV response
      }

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'An error occurred while sending the message.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Handle the Enter key to send message
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  // Function to parse CSV and store data for table rendering
  const parseCSV = (csvString) => {
    Papa.parse(csvString, {
      header: true, // Treat first row as header
      complete: (result) => {
        setTableData(result.data); // Set the parsed data
      },
    });
  };

  // Function to parse structured responses and store it for rendering
  const parseStructuredResponse = (response) => {
    // Example of how you could structure the response (adjust according to your data format)
    const structured = response.split('**').map((section) => section.trim()).filter(Boolean);
    setStructuredResponse(structured);
  };

  // Function to download table data as PDF
  const downloadPDF = () => {
    const table = document.getElementById('timetable'); // Get the timetable DOM element
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, canvas.height * 180 / canvas.width);
      pdf.save('timetable.pdf');
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-10 text-blue-700">AI-Powered Attendance System</h1>

      {/* Navigation for events page */}
      <nav className="mb-6">
  <Link href="/events" className="text-blue-500 hover:underline">
    View Upcoming Events
  </Link>
</nav>


      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Webcam Capture Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Webcam Attendance</h2>
          <div className="flex flex-col items-center">
            <WebcamCapture />
            <p className="text-sm mt-4 text-gray-500">Ensure your face is clearly visible for accurate attendance capture.</p>
          </div>
        </div>

        {/* Chatbot Section */}
        <div className="bg-white p-8 rounded-lg shadow-xl flex flex-col">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">AI Chatbot</h2>
          <div className="h-80 overflow-y-auto mb-6 bg-gray-100 p-6 rounded-lg">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 p-4 rounded-lg shadow-md ${
                  msg.sender === 'user' ? 'bg-blue-200 text-right' : 'bg-gray-200 text-left'
                }`}
              >
                <p className="text-lg">{msg.text}</p>
              </div>
            ))}
            {loading && <div className="text-gray-500">AI is thinking...</div>}
          </div>
          <div className="flex">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow border border-gray-300 rounded-l-lg p-3 text-lg"
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition duration-200"
              disabled={loading}
            >
              Send
            </button>
          </div>

          {/* Display structured response */}
          {structuredResponse && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6">Generated Timetable:</h3>
              <div id="structured-timetable" className="text-lg leading-8">
                {structuredResponse.map((section, idx) => (
                  <p key={idx} className="mb-4">{section}</p>
                ))}
              </div>
            </div>
          )}

          {/* CSV Table and PDF Download */}
          {tableData && tableData.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6">Generated CSV Timetable:</h3>
              <div id="timetable" className="overflow-x-auto">
                <table className="min-w-full table-auto bg-gray-100 rounded-lg shadow-md overflow-hidden">
                  <thead>
                    <tr className="bg-gray-300">
                      {Object.keys(tableData[0]).map((header, index) => (
                        <th key={index} className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, rowIndex) => (
                      <tr key={rowIndex} className="even:bg-gray-200">
                        {Object.values(row).map((cell, cellIndex) => (
                          <td key={cellIndex} className="px-6 py-4 text-sm text-gray-800 border-b border-gray-300">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Button to download PDF */}
              <button
                onClick={downloadPDF}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition duration-200"
              >
                Download as PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
