"use client";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
   return (
      <nav className="flex items-center justify-between p-6 lg:px-16">
         <div>
            <Link href="/" className="">
               <span className="sr-only">Roofone</span>
               <Image
                  src="/RoofoneLogo.svg"
                  alt="Roofone"
                  width={50}
                  height={50}
               />
            </Link>
         </div>
         <div>
            <Link href="/" className="flex gap-2">
               <span className="sr-only">Github</span>
               <span>Github</span>
               <Image
                  src="/github-mark.svg"
                  alt="Gitbub"
                  width={25}
                  height={25}
               />
            </Link>
         </div>
      </nav>
   );
}
