"use client";

import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES, Document } from '@contentful/rich-text-types';
import Image from 'next/image';

// --- 1. Import our new component ---
import EmbeddedCTA from './EmbeddedCTA';

// This component parses the JSON from Contentful's Rich Text field
// and renders it as HTML with proper styling.

const options: Options = {
  renderNode: {
    // --- Style paragraphs ---
    [BLOCKS.PARAGRAPH]: (node, children) => (
      <p className="mb-6 text-lg leading-relaxed text-gray-700">{children}</p>
    ),
    
    // --- Style Headings (H1, H2, H3) ---
    [BLOCKS.HEADING_1]: (node, children) => (
      <h1 className="text-4xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <h2 className="text-3xl font-semibold mt-8 mb-4 text-gray-900">{children}</h2>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <h3 className="text-2xl font-semibold mt-6 mb-4 text-gray-900">{children}</h3>
    ),
    
    // --- Style Lists ---
    [BLOCKS.UL_LIST]: (node, children) => (
      <ul className="list-disc list-inside mb-6 space-y-2 text-lg text-gray-700">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node, children) => (
      <ol className="list-decimal list-inside mb-6 space-y-2 text-lg text-gray-700">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node, children) => (
      <li>{children}</li>
    ),

    // --- Style Blockquotes ---
    [BLOCKS.QUOTE]: (node, children) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 text-xl italic text-gray-600">
        {children}
      </blockquote>
    ),

    // --- Style Links ---
    [INLINES.HYPERLINK]: (node, children) => (
      <a 
        href={node.data.uri} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-blue-600 underline hover:text-blue-800"
      >
        {children}
      </a>
    ),

    // --- Render Embedded Images (if you add them) ---
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { file, title } = node.data.target.fields;
      const url = file.url.startsWith('//') ? `https:${file.url}` : file.url;
      const { width, height } = file.details.image;
      
      return (
        <div className="my-6">
          <Image
            src={url}
            alt={title || 'Blog post image'}
            width={width}
            height={height}
            className="rounded-lg shadow-md"
          />
        </div>
      );
    },

    // --- 2. RENDER OUR NEW EMBEDDED CTA COMPONENT ---
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      // Check if it's our new "Embedded CTA" type
      if (node.data.target.sys.contentType.sys.id === 'embeddedCta') {
        const { headline, subtext, buttonText } = node.data.target.fields;
        return (
          <EmbeddedCTA
            headline={headline}
            subtext={subtext}
            buttonText={buttonText}
          />
        );
      }
      return null; // Don't render other embedded entry types for now
    },
  },
};

export const RichText = ({ content }: { content: Document }) => {
  return <>{documentToReactComponents(content, options)}</>;
};