import { Bio } from "@/components/resume/Bio";
import { Education } from "@/components/resume/Education";
import { Experience } from "@/components/resume/Experience";
import { Info } from "@/components/resume/Info";
import Layout from "@/components/layout";
import { Projects } from "@/components/resume/Projects";
import { Skills } from "@/components/resume/Skills";
import { gql } from "@apollo/client";
import apolloClient from "src/utils/apollo-client";

const Resume = ({ data, layout }: any) => {
  return (
    <Layout
      id="resume"
      class="relative h-full w-screen"
      subClass="flex w-screen h-full"
      layout={layout}
      light
      disableExtra
    >
      <div
        className={
          "max-w-screen-xl m-auto min-h-full pt-20 overflow-auto h-full"
        }
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <img
              className={"w-6/12 p-5 ml-20 border  mb-20"}
              src={data.profileImg}
            />

            <Experience data={data.experience} />
          </div>
          <div>
            <h1 className="text-3xl  textBg text-center">{data.title}</h1>
            <Info data={data.info} />
            <Bio data={data.bio} />
            <hr style={{ padding: 10, margin: "0 36px" }} />
            <Education data={data.education} />
            <hr style={{ padding: 10, margin: "0 36px" }} />
            <Skills data={data.skills} />
          </div>
        </div>
        <Projects data={data.projects} />
      </div>
    </Layout>
  );
};

export default Resume;

export async function getServerSideProps(context: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(id: "6ObKNTDcUY5zmOqpmlJunl") {
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
