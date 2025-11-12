import Script from 'next/script';

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Gen Elevate",
    "alternateName": "GenElevate",
    "url": "https://www.genelevate.co.uk",
    "logo": "https://www.genelevate.co.uk/Genelevate logo.png",
    "description": "AI-powered education platform offering GCSE & A-Level courses, career guidance, and 24/7 AI tutoring for UK students.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "GB",
      "addressRegion": "England"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Support",
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://twitter.com/genelevate",
      "https://linkedin.com/company/genelevate",
      "https://facebook.com/genelevate"
    ]
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Gen Elevate Platform",
    "description": "Comprehensive AI-powered education platform with GCSE & A-Level courses, live webinars, career guidance, and 24/7 AI tutoring.",
    "brand": {
      "@type": "Brand",
      "name": "Gen Elevate"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.genelevate.co.uk/pricing",
      "priceCurrency": "GBP",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Gen Elevate"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Gen Elevate",
    "url": "https://www.genelevate.co.uk",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.genelevate.co.uk/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CourseSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "GCSE & A-Level Courses",
    "description": "Comprehensive online courses covering all GCSE and A-Level subjects with AI tutoring support.",
    "provider": {
      "@type": "Organization",
      "name": "Gen Elevate",
      "sameAs": "https://www.genelevate.co.uk"
    },
    "offers": {
      "@type": "Offer",
      "category": "Education",
      "priceCurrency": "GBP"
    },
    "educationalCredentialAwarded": "GCSE and A-Level Preparation",
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "online",
      "courseWorkload": "PT10H"
    }
  };

  return (
    <Script
      id="course-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BreadcrumbSchema({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

