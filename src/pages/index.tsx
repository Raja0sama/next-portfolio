import { useAnimation } from "framer-motion";
import { Layout } from "@/components/index";
import { useEffect, useState } from "react";
import apolloClient from "src/utils/apollo-client";
import { gql } from "@apollo/client";

const Home = ({ data, layout }: any) => {
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

  const [light, setTheme] = useState(false);
  let styleOBj: any = {};
  if (light) {
    styleOBj.className = "h-full w-44 bg-white";
    styleOBj.style = {
      background:
        "linear-gradient(90deg, rgba(255,255,255,1) 17%, rgba(0,212,255,0) 100%)",
    };
  } else {
    styleOBj.className = "h-full w-44 bg-white";
    styleOBj.style = {
      background:
        "linear-gradient(90deg, rgba(0,0,0,1) 17%, rgba(255,255,255,0) 100%)",
    };
  }
  return (
    <Layout
      onThemeChange={setTheme}
      layout={layout}
      disableExtra={false}
      light={false}
    >
      <div className="flex flex-1 justify-center items-center h-full flex-col">
        <div className="flex-1 sm:flex relative hidden ">
          <div className="flex-1 flex items-center justify-center">
            <div className="flex flex-col justify-center  z-10">
              <h2 className=" text-2xl font-light mb-2 font-['Rock_Salt'] opacity-70">
                Senior Full Stack Engineer
              </h2>
              <h1 className="font-['main'] sm:text-[102px] lg:text-[170px] leading-[83.99999737739563%] ">
                RAJA
                <br />
                OSAMA
              </h1>
              <p className=" text-xl m-w-[600px] font-light capitalize opacity-75">
                I describe myself as a Polyglot ~ Tech Agnostic ~ Rockstar
                Software Engineer. I like Tech, Travel and Innovation.
              </p>
            </div>
          </div>
          <div className="flex-1">
            <div className="absolute  w-[60%] right-0   h-full flex justify-center items-center">
              <div
                className=" h-96 w-full bg-cover mr-20 relative"
                style={{
                  backgroundImage: "url(/bg.png)",
                }}
              >
                <div {...styleOBj} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 sm:hidden flex justify-center items-center">
          <div>
            <h2 className=" text-lg text-center font-light mb-2 font-['Rock_Salt'] opacity-70">
              Senior Full Stack Engineer
            </h2>
            <h1 className="font-['main'] text-center text-[90px] lg:text-[170px] leading-[83.99999737739563%] ">
              RAJA
              <br />
              OSAMA
            </h1>
            <p className=" text-lg text-center font-normal font-[secondary] opacity-75">
              I describe myself as a Polyglot ~ Tech Agnostic ~ Rockstar
              Software Engineer. I like Tech, Travel and Innovation.
            </p>
          </div>
        </div>
        <div className="flex w-full p-3 justify-end z-10">
          <span className="font-['secondary'] md:text-6xl text-[10vw] leading-[1] text-right uppercase font-bold">
            Creative
            <br />
            Developer
          </span>
        </div>
      </div>
    </Layout>
  );
};
export default Home;

export async function getStaticProps(context: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(id: "66mMRpMUryBtYwI5cjtlhG") {
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
