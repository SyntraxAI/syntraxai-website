import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/*
          This is the new, simplified layout.
          It stacks and centers on mobile and becomes a row on desktop.
        */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <h3 className="text-2xl font-bold text-white">
              Syntrax AI
            </h3>
          </div>
          
          {/* Copyright */}
          <p className="text-xs leading-5 text-gray-400">
            &copy; {currentYear} Syntrax AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}