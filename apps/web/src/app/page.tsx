"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
	return (
    <div className="flex flex-col items-center justify-center text-center ">
      
      {/* Headline */}
    <h1 className="text-5xl  font-extrabold leading-tight text-center text-gray-900">
  Send Personalized Emails Effortlessly <br />
  with AI & Excel
</h1>

<p className="text-2xl font-semibold mt-6 max-w-2xl text-gray-600 text-center">
  Upload your Excel file, generate smart messages using AI and send emails directly via Gmail.
</p>


      {/* CTA Button */}
      <div className="mt-12">
        <Button className="bg-indigo-300 text-md text-black font-bold px-6 py-3 rounded-2xl hover:bg-indigo-400 transition"
        // onClick={()=>{
        //   navigate('/dashboard');
        // }}
        >
          Get Started
        </Button>
      </div>

      {/* Optional decorative gradient bar */}
    </div>
	);
}
