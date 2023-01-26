import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

import { Layout } from "@/components/index";
import apolloClient from "src/utils/apollo-client";
import { gql } from "@apollo/client";

const Contact = ({ data, layout }: any) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      z: 4,
      y: 0,
      transition: { delay: i * 0.5 },
    }));
  }, []);

  return (
    <Layout disableExtra={false} layout={layout} light={false}>
      <div className="h-full p-5" style={{ zIndex: 10 }}>
        <div className="mt-60 " />
        <motion.div
          custom={0}
          animate={controls}
          style={{ opacity: 0, y: -10 }}
          className="text-4xl font-bold text-left capitalize"
        >
          {data.title}
        </motion.div>
        <br />
        <motion.div
          custom={1}
          animate={controls}
          style={{ opacity: 0, y: -10 }}
          className="font-thin text-lg w-3/5 "
        >
          {data.description}
          <br />
          <br />
          <span className="p-2 px-5 border-2  ">
            rajaosama.me@gmail.com or contact@rajaosama.me
          </span>
        </motion.div>
      </div>
    </Layout>
  );
};
export default Contact;

export async function getStaticProps(context: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(id: "5dhc8Zqzou1QTbFxhaehCf") {
          metaTitle
          metaDescription
          content
        }
        layout(id: "6ZwmAPrnIrU5rfGWKu1fMQ") {
          content
        }
      }
    `,
  });

  return {
    props: {
      data: data.pages.content,
      metaTitle: data.pages?.metaTitle,
      metaDescription: data.pages?.metaDescription,
      layout: data.layout.content,
    }, // will be passed to the page component as props
  };
}
