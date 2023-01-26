import { gql } from "@apollo/client";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import Link from "next/link";
import React, { useEffect } from "react";
import apolloClient from "src/utils/apollo-client";

import Layout from "../../components/layout";

const Projects = ({ data, layout }: any) => {
  const projects = data;
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

  return (
    <Layout disableExtra={false} layout={layout} light={false}>
      <div className="h-full w-full overflow-auto  justify-center flex-col pr-5 sm:p-10">
        <div className="mt-60" />
        <motion.div
          custom={0}
          style={{ opacity: 0, y: 10, scale: 0 }}
          animate={controls}
          className="text-6xl font-extrabold"
        >
          PROJECTS .
        </motion.div>
        <br />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 md:grid-cols-1  gap-4">
          {projects.map((e: any, i: number) => (
            <motion.div
              key={e.slug}
              custom={i + 1}
              layoutId={e.slug}
              whileHover={{ scale: 1.01 }}
              style={{ opacity: 0, y: 100 }}
              animate={controls}
              className="flex justify-center p-2"
            >
              <div className="flex flex-col justify-start w-full">
                <img className="w-full object-cover h-80" src={e.image} />
                <div className="mt-4" />
                <Link href={e.slug} passHref>
                  <h2 className="text-xl cursor-pointer">{e.title}</h2>
                </Link>
                <p className="text-md font-light">
                  {e.description.slice(0, 140) + "..."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Projects;

export async function getServerSideProps(context: any) {
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
          }
        }
      }
    `,
  });

  return {
    props: {
      data: data.projectsCollection.items,
      metaTitle: data.pages?.metaTitle,
      metaDescription: data.pages?.metaDescription,
      layout: data.layout.content,
    }, // will be passed to the page component as props
  };
}
