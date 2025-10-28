import { Metadata } from 'next';
import ProjectCard from '@/components/ProjectCard'; // Import our new component
import { projectData } from '@/data/projects'; // Import our new data

// SEO: Add page-specific metadata
export const metadata: Metadata = {
  title: 'Fixed-Price Projects to Launch Your Brand',
  description: 'The essential, high-impact projects you need, delivered with precision and speed. No hidden fees. No long-term commitments.',
};

export default function ProjectsPage() {
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
          {/* We map (loop) over our projectData array.
            For each project, we render a ProjectCard component
            and pass the project's data in as props.
          */}
          {projectData.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              price={project.price}
              description={project.description}
              includes={project.includes}
              whoFor={project.whoFor}
              ctaLink={project.ctaLink}
            />
          ))}
        </div>
      </div>
    </main>
  );
}