import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Layout from "@/components/layout";
import { gql } from "@apollo/client";
import apolloClient from "src/utils/apollo-client";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";

interface BlogsTypes {
  layout: any;
  blogs: any;
  data: any;
}

const Blogs = ({ layout, blogs, data }: BlogsTypes) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      z: 4,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.8 },
    }));
  }, []);

  const exp =
    /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/gm;

  return (
    <Layout disableExtra={false} layout={layout} light={true}>
      <div className="h-full w-full overflow-auto  justify-center flex-col lg:p-10 md:p-5 sm:p-3">
        <div className="mt-60" />
        <motion.div
          custom={0}
          style={{ opacity: 0, y: 10, scale: 0 }}
          animate={controls}
          className="text-6xl font-extrabold"
        >
          {data?.title} .
        </motion.div>
        <br />
        <div className="font-light max-w-2xl">{data?.description}</div>
        <div className="mt-20" />
        <div className="grid lg:grid-cols-3 md:grid-cols-2 md:grid-cols-1  gap-4">
          {blogs?.map((e: any) => {
            let image = e?.cover?.url;
            try {
              if (!image) {
                image = exp.exec(e.content);
                if (Array.isArray(image)) image = image[1];
              }
            } catch (e) {
              image =
                "https://miro.medium.com/max/800/1*hFwwQAW45673VGKrMPE2qQ.png";
            }

            return (
              <div
                key={e.slug}
                className="border-solid border-2 border-white flex  p-2 h-min-96 flex-col"
              >
                <img src={image} />
                <div className="mt-2" />
                <div className="font-bold ">
                  <Link href={`blogs/${e.slug}`} passHref>
                    <h2 className="text-xl cursor-pointer">{e.title}</h2>
                  </Link>
                </div>
                <div className="mt-2" />
                <p className="text-md">{e.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;

export async function getServerSideProps(context: any) {
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

  console.log({ data: data.blogsCollection.items[0].sys });

  return {
    props: {
      layout: data.layout.content,
      blogs: data.blogsCollection.items,
      metaTitle: data.pages?.metaTitle,
      metaDescription: data.pages?.metaDescription,
      data: { title: data.pages.title, ...data.pages.content },
    }, // will be passed to the page component as props
  };
}
