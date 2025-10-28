import Link from 'next/link';

// Define the 'props' that our component will accept
type ProjectCardProps = {
  title: string;
  price: string;
  description: string;
  includes: string[];
  whoFor: string;
  ctaLink: string;
};

// This is our reusable component
export default function ProjectCard({ 
  title, 
  price, 
  description, 
  includes, 
  whoFor, 
  ctaLink 
}: ProjectCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden">
      {/* 1. Header: Title and Price */}
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-4xl font-bold text-blue-600">{price}</p>
        <p className="mt-3 text-base text-gray-600">{description}</p>
      </div>

      {/* 2. Features: What's Included */}
      <div className="flex-grow flex flex-col justify-between p-6 bg-gray-50">
        <ul role="list" className="space-y-4">
          {/* Loop over the 'includes' array to create list items */}
          {includes.map((item) => (
            <li key={item} className="flex items-start">
              <div className="flex-shrink-0">
                {/* Simple Check Icon */}
                <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <p className="ml-3 text-base text-gray-700">{item}</p>
            </li>
          ))}
        </ul>

        {/* 3. Who It's For & CTA */}
        <div className="mt-8">
          <p className="mt-4 text-sm font-medium text-gray-500">
            <span className="font-bold text-gray-700">Who it's for:</span> {whoFor}
          </p>
          <Link 
            href={ctaLink} 
            className="mt-6 block w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-lg font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Start Your Project Today
          </Link>
        </div>
      </div>
    </div>
  );
}