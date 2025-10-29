import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard'; // We reuse our existing component!
import { contentfulClient } from '@/lib/contentful'; // Import our new client

// SEO: Add page-specific metadata
export const metadata: Metadata = {
  title: 'Fixed-Price Projects to Launch Your Brand',
  description: 'The essential, high-impact projects you need, delivered with precision and speed. No hidden fees. No long-term commitments.',
};

// This is the data-fetching function.
// It runs on the server during the build.
async function getProjects() {
  try {
    const entries = await contentfulClient.getEntries({
      content_type: 'project', // This is the 'Api Identifier' of our Content Model
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching projects from Contentful:", error);
    return []; // Return an empty array on error
  }
}


export default async function ProjectsPage() {
  // 1. Fetch the data from Contentful
  const projects = await getProjects();

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        {/* Page Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Fixed-Price Projects
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            The essential, high-impact projects you need, delivered with precision and speed. 
            No hidden fees. No long-term commitments.
          </p>
        </div>

        {/* Product Menu Grid */}
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-stretch gap-8 lg:max-w-none lg:grid-cols-3">
          {/* 2. We map over the data from Contentful */}
          {projects.map((project) => (
            <ProjectCard
              key={project.sys.id}
              // @ts-ignore
              title={project.fields.title}
              // @ts-ignore
              price={project.fields.price}
              // @ts-ignore
              description={project.fields.description}
              // @ts-ignore
              includes={project.fields.includes}
              // @ts-ignore
              whoFor={project.fields.whoFor}
              // @ts-ignore
              ctaLink={project.fields.ctaLink}
            />
          ))}
        </div>
      </div>
    </main>
  );
}