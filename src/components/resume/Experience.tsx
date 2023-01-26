export function Experience({ data }: any) {
  return (
    <div className={"flex "}>
      <div
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
        className={"pt-10 text-xl flex justify-center"}
      >
        <span className={"tracking-widest textBg"}>{data.title}</span>
      </div>
      <div className={"px-10 text-base text-lg"}>
        {data.list.map((e: any) => (
          <div key={e.company} className={"mb-10"}>
            <p>
              <span>{e.range}</span>
              <span className={"	font-light	"}>{e.company}</span>
            </p>

            <p className={"	text-md font-normal	"}>{e.title}</p>

            <p className={"text-sm font-normal	"}>
              {" "}
              {"' " + e.companyDescription + " '"}
            </p>
            <br />
            <p className={"text-sm font-normal	"}>
              <b>Projects : </b> {e.project.join(", ")}
            </p>
            <p className={"text-sm font-bold text-rose-900"}>
              Detail about projects can be found at the bottom projects sections
            </p>
            <br />
            <p
              className={"text-md font-light"}
              dangerouslySetInnerHTML={{ __html: e.description }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
