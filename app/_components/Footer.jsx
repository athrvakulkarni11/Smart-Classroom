import React from 'react'
import Image from 'next/image'
function Footer() {
  return (
    <footer className="bg-gray-100">
    <div className="mx-auto max-w-5xl    justify-center   text-center   flex flex-col   items-center  px-4 py-16 sm:px-6 lg:px-8">
    <Image src='data:image/jpeg;base64,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' alt='logo' width={150} height={70} />
    <span className=' text-red-600 text-md font-semibold mt-2'>Dr. D.Y.Patil Institue of Technology</span>

  
      <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> About </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Careers </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> History </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Services </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Projects </a>
        </li>
  
        <li>
          <a className="text-gray-700 transition hover:text-gray-700/75" href="#"> Blog </a>
        </li>
      </ul>
  
      <ul className="mt-12 flex justify-center gap-6 md:gap-8">
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:text-gray-700/75"
          >
            <span className="sr-only">Facebook</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
  
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:text-gray-700/75"
          >
            <span className="sr-only">Instagram</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
  
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:text-gray-700/75"
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"
              />
            </svg>
          </a>
        </li>
  
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:text-gray-700/75"
          >
            <span className="sr-only">GitHub</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
  
        <li>
          <a
            href="#"
            rel="noreferrer"
            target="_blank"
            className="text-gray-700 transition hover:text-gray-700/75"
          >
            <span className="sr-only">Dribbble</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  </footer>
  )
}

export default Footer
