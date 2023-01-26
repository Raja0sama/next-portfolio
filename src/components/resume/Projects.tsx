export function Projects({ data }: any) {
  return (
    <div className={"flex mt-10 "}>
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
      <div className="flex flex-wrap">
        {data.list.map((e: any) => (
          <div key={e.title} className={"px-5 py-2 px-1 border my-2 mx-2"}>
            <p className={"	text-lg font-normal	"}>{e.title}</p>
            <p className={"	text-basic font-light	"}>{e.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
