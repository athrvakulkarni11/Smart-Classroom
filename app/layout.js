import { Toaster } from "@/components/ui/toaster";
import { Outfit } from "next/font/google";
import Footer from "./_components/Footer";
import Header from "./_components/Header";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Dr. D.Y.Patil Institute of Technology",
  description: "",
  openGraph:{
    title: "Dr. D.Y.Patil Institute of Technology",
    description: "",
    type:"website",
    locale:"en_US",
    url:process.env.URL_LAYOUT_JS,
    siteName:"drbhatpune.com"
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <div className="md:px-20">
          <Header/>
          
          {children}
          <Toaster/>
        </div>

        <Footer/>
       </body>
    </html>
  );
}
