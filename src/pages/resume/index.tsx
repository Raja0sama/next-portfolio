import apolloClient from "src/utils/apollo-client";
import { gql } from "@apollo/client";

const Resume = ({ data, layout }: any) => {
  return (
    <div>
      <iframe src={data} width="100%" className="h-[100vh]"></iframe>
    </div>
  );
};

export default Resume;

export async function getServerSideProps(context: any) {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        # add your query
        asset(id: "65pOsZZY5VWYfJvD5aZX8E") {
          fileName
          url
        }
      }
    `,
  });

  return {
    props: {
      data: data.asset.url,
    }, // will be passed to the page component as props
  };
}
