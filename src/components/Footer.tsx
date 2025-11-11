import Link from 'next/link';
import Image from 'next/image'; // Import the Image component

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/*
            FIX: Replaced the <h3> text with the Image component.
            We are using Tailwind's 'filter' classes to make the dark logo.png appear white.
            - filter: Enables filters
            - grayscale: Removes the blue/green
            - brightness-0: Makes the gray logo black
            - invert: Flips the black to white
          */}
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Syntrax AI</span>
            <Image
              src="/logo.png"
              alt="Syntrax AI Logo (White)"
              width={192}
              height={48}
              className="h-12 w-auto filter grayscale brightness-0 invert"
            />
          </Link>
          
          {/* Copyright */}
          <p className="text-xs leading-5 text-gray-400">
            &copy; {currentYear} Syntrax AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}