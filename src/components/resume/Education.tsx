export function Education({ data }: any) {
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
      <div className={"px-10 text-base"}>
        {data.list.map((e: any) => (
          <div key={e.company} className={"mb-10 text-lg"}>
            <p>
              <span>{e.range}</span>
              <span className={"	font-normal	"}>{e.company}</span>
            </p>
            <p className={"	text-md font-light	"}>{e.course}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
