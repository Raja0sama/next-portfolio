import { gql } from "@apollo/client";
import { GetServerSideProps } from "next";
import { getServerSideSitemap, ISitemapField } from "next-sitemap";
import apolloClient from "src/utils/apollo-client";

export const getBlogs = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(id: "65sP1oUAwVLHNAYnGzX9OO") {
          metaTitle
          metaDescription
          content
          title
        }
        blogsCollection {
          items {
            title
            slug
            content
            sys {
              firstPublishedAt
            }
            description
            cover {
              url
            }
          }
        }
        layout(id: "6ZwmAPrnIrU5rfGWKu1fMQ") {
          content
        }
      }
    `,
  });
  return data;
};

const getProjects = async () => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(id: "4nc48LyEWnE75g3pjAim0Z") {
          metaTitle
          metaDescription
          content
        }
        layout(id: "6ZwmAPrnIrU5rfGWKu1fMQ") {
          content
        }
        projectsCollection {
          items {
            image
            link
            technology
            description
            slug
            title
            image
            sys {
              publishedAt
            }
          }
        }
      }
    `,
  });
  return data;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const siteUrl = "https://rajaosama.me";
  const blogs: any = await getBlogs();
  const projects: any = await getProjects();

  const blogsFields: ISitemapField[] = blogs?.blogsCollection.items.map(
    (data: any) => ({
      loc: `${siteUrl}/blogs/${data.slug}`,
      lastmod: new Date(data.sys.firstPublishedAt).toISOString(),
    })
  );
  const projectFields: ISitemapField[] = projects?.projectsCollection.items.map(
    (data: any) => {
      console.log({ data });
      return {
        loc: `${siteUrl}/${data.slug}`,
        lastmod: new Date(data.sys.publishedAt).toISOString(),
      };
    }
  );

  return getServerSideSitemap(ctx, [...blogsFields, ...projectFields]);
};

export default function Site() {
  //console
}
