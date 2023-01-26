import { AnimatePresence, motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

import { Layout } from "@/components/index";
import { gql } from "@apollo/client";
import apolloClient from "src/utils/apollo-client";
import Link from "next/link";

const Projects = ({ data, layout }: any) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      z: 4,
      y: 0,
      transition: { delay: i * 0.2 },
    }));
  }, []);

  const _AnimatePresence: any = AnimatePresence;
  return (
    <Layout disableExtra={false} layout={layout} light={false}>
      <div className="h-full w-full flex">
        <div className="h-full w-full h-full w-full  flex flex-col justify-center p-2">
          <motion.div
            custom={1}
            animate={controls}
            className="text-6xl font-extrabold "
            style={{ opacity: 0, x: -10 }}
          >
            {data.title}
          </motion.div>
          <br />
          <motion.div
            custom={1}
            animate={controls}
            style={{ opacity: 0, x: -10 }}
            className="text-xl font-thin"
          >
            {data.description}
          </motion.div>
          <br />
          <motion.div
            custom={2}
            animate={controls}
            style={{ opacity: 0, x: -10 }}
            className="text-xl font-thin"
          >
            <b>Technology</b> : {data.technology.map((e: any) => ` ${e},`)}
          </motion.div>
          <motion.div
            custom={3}
            animate={controls}
            style={{ opacity: 0, y: -10 }}
            className="flex"
          >
            {data.link.map((e: any) => (
              <span
                key={e.url}
                className="p-4 border-solid border-2 border-white-500 mt-4 hover:border-[#243c5a] cursor-pointer"
              >
                <Link legacyBehavior href={e.url}>
                  {e.text}
                </Link>
              </span>
            ))}
          </motion.div>
        </div>
        <_AnimatePresence>
          <motion.div
            layoutId={data.slug}
            className="h-full w-full bg-white flex justify-center items-center"
          >
            <img className="w-full object-contain" src={data.image} />
          </motion.div>
        </_AnimatePresence>
      </div>
    </Layout>
  );
};

export default Projects;

export async function getServerSideProps({ req, res, params }: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query D($slug: String!) {
        layout(id: "6ZwmAPrnIrU5rfGWKu1fMQ") {
          content
        }
        projectsCollection(where: { slug: $slug }) {
          items {
            image
            link
            technology
            description
            slug
            image
            title
          }
        }
      }
    `,
    variables: {
      slug: "projects/" + params.slug,
    },
  });

  return {
    props: {
      data: data.projectsCollection.items[0],
      //   metaTitle: data.pages?.metaTitle,
      //   metaDescription: data.pages?.metaDescription,
      layout: data.layout.content,
    }, // will be passed to the page component as props
  };
}
