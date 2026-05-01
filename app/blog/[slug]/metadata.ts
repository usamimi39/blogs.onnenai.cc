import { Metadata } from "next";
import { docs, meta } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";
import { siteConfig } from "@/lib/site";

type BlogData = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  featured?: boolean;
  readTime?: string;
  author?: string;
  thumbnail?: string;
};

const blogSource = loader({
  baseUrl: "/blog",
  source: createMDXSource(docs, meta),
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;

    if (!slug || slug.length === 0) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const page = blogSource.getPage([slug]);

    if (!page) {
      return {
        title: "Blog Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const data = page.data as BlogData;

    const ogUrl = `${siteConfig.url}/blog/${slug}`;
    const ogImage = `${ogUrl}/opengraph-image`;

    return {
      title: data.title,
      description: data.description,
      keywords: [
        data.title,
        ...(data.tags ?? []),
        "Blog",
        "Article",
        "Web Development",
        "Programming",
        "Technology",
        "Software Engineering",
      ],
      authors: [
        {
          name: data.author ?? "Magic UI",
          url: siteConfig.url,
        },
      ],
      creator: data.author ?? "Magic UI",
      publisher: "Magic UI",
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      openGraph: {
        title: data.title,
        description: data.description,
        type: "article",
        url: ogUrl,
        publishedTime: data.date,
        authors: [data.author ?? "Magic UI"],
        tags: data.tags,
        images: [
          {
            url: data.thumbnail ?? ogImage,
            width: 1200,
            height: 630,
            alt: data.title,
          },
        ],
        siteName: siteConfig.name,
      },
      twitter: {
        card: "summary_large_image",
        title: data.title,
        description: data.description,
        images: [data.thumbnail ?? ogImage],
        creator: "@onnenai_w57",
        site: "@onnenai_w57",
      },
      alternates: {
        canonical: ogUrl,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}
