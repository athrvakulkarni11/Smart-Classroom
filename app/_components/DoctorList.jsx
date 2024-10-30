"use client";
import Image from "next/image";
import Link from "next/link";

function DoctorList({ doctorList }) {
  return (
    <div className='mb-10 px-8'>
      <h2 className="text-2xl ml:3xl md:text-3xl lg:text-4xl font-bold text-left mb-4 lg:mb-6 underline underline-offset-4 decoration-4 decoration-black text-blue-700">
  Book Appointment...
</h2>
      {/* Responsive grid: 1 doctor per row on small screens, 2 on medium, 3 on large */}
      <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7'>
        {doctorList.length > 0 ? doctorList.map((doctor, index) => (
          <div 
            key={index}
            className='border border-gray-200 rounded-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-lg'
          >
            <Image 
              src={doctor.attributes?.Image?.data?.[0]?.attributes?.url || '/default-image.jpg'} // Fallback image if URL is undefined
              alt='doctor'
              width={500}
              height={200}
              className='h-[200px] w-full object-cover rounded-lg'
            />

            <div className='mt-4 flex flex-col gap-2'>
              <h2 className='text-xs bg-blue-100 p-1 rounded-full px-3 text-primary font-medium self-start'>
                {doctor.attributes?.categories?.data?.[0]?.attributes?.Name || 'General'}  {/* Ensures access to category name */}
              </h2>
              <h2 className='font-bold text-lg text-gray-900'>
                {doctor.attributes?.Name}
              </h2>
              <h2 className='text-cyan-600 font-bold text-sm'>
                {doctor.attributes?.Profession}
              </h2>
              <h2 className='text-sm text-red-800'>
                Area of Experience: {doctor.attributes?.Area_Of_Experience}
              </h2>
              <h2 className='text-sm text-primary'>
                {doctor.attributes?.Year_of_Experience} Years Experience
              </h2>
              <h2 className='text-sm text-gray-600'>
                {doctor.attributes?.Address}
              </h2>
              <Link href={'/details/1'}>
                <h2 
                  className='mt-4 py-2 bg-primary text-white text-sm rounded-full w-full text-center transition-colors duration-300 hover:bg-blue-700'
                >
                  Book Now
                </h2>
              </Link>
            </div>
          </div>
        )) : (
          [1, 2].map((_, index) => (
            <div key={index} className='h-[220px] bg-slate-200 w-full rounded-lg animate-pulse'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default DoctorList;
