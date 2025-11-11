import Link from 'next/link';

// Define the 'props' that our component will accept
type ProjectCardProps = {
  title: string;
  price: string;
  description: string;
  bestFor: string;
  ctaLink: string;
};

// This is our reusable component
export default function ProjectCard({ 
  title, 
  price, 
  description, 
  bestFor, 
  ctaLink 
}: ProjectCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* 1. Header: Title, Description, Price */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-3 text-base text-gray-600">{description}</p>
        <p className="mt-4 text-3xl font-bold text-primary">{price}</p>
        <p className="mt-4 text-sm font-medium text-gray-500">
          <span className="font-bold text-gray-700">Best for:</span> {bestFor}
        </p>
      </div>

      {/* 2. CTA */}
      <div className="flex-grow flex flex-col justify-end p-6 bg-gray-50">
        <Link 
          href={ctaLink} 
          className="block w-full rounded-lg bg-primary px-6 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
}