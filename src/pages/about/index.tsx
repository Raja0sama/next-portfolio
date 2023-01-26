import { motion, useAnimation } from "framer-motion";

import Layout from "../../components/layout";
import { useEffect } from "react";
import apolloClient from "src/utils/apollo-client";
import { gql } from "@apollo/client";
import Link from "next/link";

const About = ({ data, layout }: any) => {
  const controls = useAnimation();
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      z: 4,
      y: 0,
      transition: { delay: i * 0.4 },
    }));
  }, []);

  return (
    <Layout disableExtra={false} layout={layout} light={false}>
      <motion.div
        animate={controls}
        custom={4}
        // layoutId={"about"}
        style={{ opacity: 0 }}
        className={
          "w-full h-full  model overflow-auto  z-10 flex flex-col justify-center items-center p-2"
        }
      >
        <section className="w-full h-full flex flex-col items-center">
          <div className="mt-60" />
          <div className="max-w-6xl	p-30">
            <div className="md:flex justify-between md:pb-10">
              <h1 className="text-5xl	mb-10 font-bold">{data.title}</h1>
              <div>
                {data.social.label}
                {data.social.links.map((e: any, i: any) => (
                  <>
                    <u>
                      <Link legacyBehavior href={e.url}>
                        {e.label}
                      </Link>
                    </u>
                    {data.social.links.length - 1 !== i && ", "}
                  </>
                ))}
              </div>
            </div>

            {data.description.map((e: any) => (
              <p
                key={e}
                className="text-xl mb-10 font-thin"
                dangerouslySetInnerHTML={{ __html: e }}
              />
            ))}
          </div>
        </section>
      </motion.div>
    </Layout>
  );
};
export default About;

export async function getStaticProps(context: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(id: "3k4WTx7oP87su2gsKi2Zkh") {
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
