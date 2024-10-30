// app/_components/navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex space-x-4 p-4 bg-blue-600 text-white">
      <Link href="/" className="hover:underline">Home</Link>
      <Link href="/attendance" className="hover:underline">Attendance</Link>
      <Link href="/chatbot" className="hover:underline">Chatbot</Link>
      <Link href="/events" className="hover:underline">Events</Link>
      <Link href="/parking" className="hover:underline">Parking</Link>
    </nav>
  );
};

export default Navbar;
