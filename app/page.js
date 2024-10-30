"use client";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import Contact from "./_components/Contact";
import Gallery from './_components/Gallery';
import Hero from "./_components/Hero";
import GlobalApi from "./_utils/GlobalApi";
import Link from 'next/link';

// Dynamically import MapComponent with server-side rendering disabled
const MapComponent = dynamic(() => import('./_components/map'), { ssr: false });

export default function Home() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = async () => {
    const resp = await GlobalApi.getDoctorList();
    console.log(resp.data.data);
    setDoctorList(resp.data.data);
  };

  return (
    <>
      <div>
        <Hero />
      </div>
      
      

      <div className="mt-20">
        <Gallery />
      </div>

      <div id="main-container" className="main-container">
        <div id="contact-card" className="card-container">
          <h1 id="contact-header" className="header-text">Contact Us</h1>
          <Contact />
        </div>
      </div>
      <div id="map-container" className="map-container">
        <MapComponent />
      </div>
    </>
  );
}
