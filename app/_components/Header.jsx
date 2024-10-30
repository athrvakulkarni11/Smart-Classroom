"use client";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LoginLink, LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Header() {
  const [campaigns, setCampaigns] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [slideDirection, setSlideDirection] = useState("left");
  const animationDuration = 1000; // 1 second for each slide transition
  const { user } = useKindeBrowserClient();
  const pathname = usePathname();

  return (
    <header className="bg-white p-4 flex flex-col items-center justify-between">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-20">
          <div className="flex flex-col items-center">
            <Image src="data:image/jpeg;base64,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" alt="logo" width={150} height={70} />
            <span className="text-red-600 text-md font-semibold mt-2">D.Y. Patil Engineering College</span>
          </div>

          <nav className="hidden md:flex space-x-6 gap-10">
            {[
              { id: 1, name: "Home", path: "/" },
              // { id: 2, name: "Explore", path: "/#category-search" },
              // { id: 3, name: "Contact", path: "/#Contact-us" },
              { id: 4, name: "Attendance", path: "/Attendance" },
              { id: 5, name: "Chatbot", path: "/Chatbot" },
              { id: 6, name: "Events", path: "/Events" },
              { id: 7, name: "Parking", path: "/Parking" },
            ].map((item) => (
              <Link
                href={item.path}
                key={item.id}
                className={`text-gray-800 hover:text-primary transition duration-300 ease-in-out text-lg font-medium ${
                  pathname === item.path ? "font-bold" : ""
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Popover>
              <PopoverTrigger>
                <Image
                  src={user?.picture}
                  alt="profile"
                  height={40}
                  width={40}
                  className="rounded-full cursor-pointer hover:opacity-80 transition duration-300 ease-in-out"
                />
              </PopoverTrigger>
              <PopoverContent className="w-48 p-2 bg-white border border-gray-200 shadow-lg rounded-md">
                <ul className="flex flex-col gap-2">
                  <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md text-gray-800 hover:text-primary transition duration-300 ease-in-out">
                    <Link href="/my-booking">My Parking</Link>
                  </li>
                  <li className="cursor-pointer hover:bg-gray-100 p-2 rounded-md text-gray-800 hover:text-primary transition duration-300 ease-in-out">
                    <LogoutLink>Log Out</LogoutLink>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>
          ) : (
            <LoginLink>
              <Button className="bg-primary text-white hover:bg-primary-dark transition duration-300 ease-in-out">
                Login
              </Button>
            </LoginLink>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
