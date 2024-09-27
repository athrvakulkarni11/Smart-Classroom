import React, { useState } from 'react';

// Sample data for departments and their events
const departmentData = {
  'Computer Science': {
    upcoming: [
      { id: 1, title: 'Machine Learning Workshop', date: '2024-10-15', description: 'An introductory workshop on Machine Learning techniques.' },
      { id: 2, title: 'AI Conference 2024', date: '2024-11-20', description: 'A global AI conference covering the latest trends in AI.' },
    ],
    previous: [
      { id: 3, title: 'Cloud Computing Basics', date: '2023-09-10', description: 'A seminar on cloud computing fundamentals.' },
      { id: 4, title: 'Blockchain for Beginners', date: '2023-06-25', description: 'An introductory workshop on blockchain technology.' },
    ],
  },
  'Mechanical Engineering': {
    upcoming: [
      { id: 5, title: 'Automobile Design Workshop', date: '2024-10-20', description: 'Learn the basics of automobile design.' },
    ],
    previous: [
      { id: 6, title: 'Fluid Mechanics Seminar', date: '2023-08-18', description: 'Advanced topics in fluid mechanics.' },
    ],
  },
  'Civil Engineering': {
    upcoming: [
      { id: 7, title: 'Bridge Design Workshop', date: '2024-11-05', description: 'Understanding the principles of bridge design.' },
    ],
    previous: [
      { id: 8, title: 'Construction Management Conference', date: '2023-07-22', description: 'Latest trends in construction management.' },
    ],
  },
  // Add more departments here
};

const EventPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-blue-700 mb-6">Departments</h1>

      {/* Departments Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Select a Department:</h2>
        <div className="flex space-x-4">
          {Object.keys(departmentData).map((department, idx) => (
            <button
              key={idx}
              onClick={() => handleDepartmentClick(department)}
              className={`px-4 py-2 text-white font-semibold rounded-lg shadow-md ${
                selectedDepartment === department ? 'bg-blue-600' : 'bg-blue-400'
              } hover:bg-blue-500 transition duration-200`}
            >
              {department}
            </button>
          ))}
        </div>
      </div>

      {/* Events Section */}
      {selectedDepartment && (
        <div>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Events for {selectedDepartment}
          </h2>

          {/* Previous Events */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Previous Events</h3>
            {departmentData[selectedDepartment].previous.length > 0 ? (
              <div className="space-y-6">
                {departmentData[selectedDepartment].previous.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-800">{event.title}</h4>
                    <p className="text-gray-600 mb-2">Date: {event.date}</p>
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No previous events available.</p>
            )}
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upcoming Events</h3>
            {departmentData[selectedDepartment].upcoming.length > 0 ? (
              <div className="space-y-6">
                {departmentData[selectedDepartment].upcoming.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-semibold text-gray-800">{event.title}</h4>
                    <p className="text-gray-600 mb-2">Date: {event.date}</p>
                    <p className="text-gray-700">{event.description}</p>

                    {/* Register Button */}
                    <button className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200">
                      Register
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No upcoming events available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventPage;