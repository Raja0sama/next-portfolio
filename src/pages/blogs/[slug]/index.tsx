/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import { gql } from "@apollo/client";
import apolloClient from "src/utils/apollo-client";
import { motion, useAnimation } from "framer-motion";

import { GithubComponent } from "@/components/index";
import dynamic from "next/dynamic";
import Image from "next/image";
interface BlogsTypes {
  layout: any;
  blog: any;
}

export const MarkdownPreview = dynamic(
  () => import("../../../components/MarkdownPreview"),
  { ssr: false }
);

const Blog = ({ layout, blog }: BlogsTypes) => {
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
  const [theme, settheme] = useState(true);
  return (
    <Layout
      disableEffect={true}
      disableExtra={false}
      layout={layout}
      light={true}
      onThemeChange={settheme}
    >
      <div className="h-full flex-1 overflow-auto  justify-center flex-col p-2 md:p-10 relative">
        <div className="max-w-full md:max-w-5xl m-auto">
          <div className="mt-20" />
          <div className="text-xl text-center"> {blog?.category}</div>
          <div className="mt-4" />
          <motion.div
            custom={0}
            style={{ opacity: 0, y: 10, scale: 0 }}
            animate={controls}
            className="text-6xl font-extrabold text-center max-w-xlg m-auto"
          >
            <h1>{blog?.title}</h1>
          </motion.div>
          <br />
          <div className="font-extralight max-w-2xl m-auto text-center">
            {blog?.description}
          </div>
          <div className="mt-4" />

          <img
            src={blog?.cover?.url}
            className={
              "max-h-80 object-cover w-full border-solid border-white border-4"
            }
          />
          <div className="mt-20" />
          <div className="relative">
            <MarkdownPreview
              source={blog?.content}
              style={{ background: "transparent", fontFamily: "Poppins" }}
              className={"mix-blend-difference font-['Poppins']"}
              wrapperElement={{
                "data-color-mode": "dark",
              }}
            />
          </div>
          <div
            className="mt-20 border-black border-4 p-4 sm:flex"
            style={{ borderColor: theme ? "black" : "white" }}
          >
            <Image
              alt={"Author Image"}
              src={"https://i.imgur.com/LSKFFtI.jpg"}
              style={{ height: 300, width: 300 }}
              width={300}
              height={300}
            />
            <div className="sm:ml-5 flex flex-col justify-center">
              <h3 className="mb-2 text-4xl">Raja Osama</h3>
              <p>
                I Describe Myself as a Polyglot ~ Tech Agnostic ~ Rockstar
                Software Engineer. I Specialise in Javascript-based tech stack
                to create fascinating applications.
                <br />
                <br />I am also open for freelance work, and in-case you want to
                hire me, you can contact me at rajaosama.me@gmail.com or
                contact@rajaosama.me
              </p>
            </div>
          </div>
          <div
            style={{ backgroundColor: theme ? "black" : "white" }}
            className=" p-4 bg-black border-r-4"
          >
            <GithubComponent />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;

export async function getServerSideProps({ params }: any) {
  const { slug } = params;
  const { data } = await apolloClient.query({
    query: gql`
      query ($slug: String!) {
        blogsCollection(where: { slug: $slug }) {
          items {
            title
            slug
            category
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
    variables: {
      slug: slug,
    },
  });
  return {
    props: {
      layout: data.layout.content,
      blog: data.blogsCollection.items[0],
      metaTitle: data.blogsCollection.items[0].title,
      metaDescription: data.blogsCollection.items[0].description,
    }, // will be passed to the page component as props
  };
}
