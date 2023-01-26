export function Skills({ data }: any) {
  return (
    <div className={"flex mt-10"}>
      <div
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg)",
        }}
        className={"pt-10 text-xl flex justify-center"}
      >
        <p className={"tracking-widest textBg"}>{data.title}</p>
      </div>
      <div className={"pl-10 flex flex-row flex-wrap text-lg"}>
        {data.list.map((e: any) => (
          <span
            key={e}
            className={"px-2 py-2 m-1 border-2 border-gray-400 font-light"}
          >
            {e}
          </span>
        ))}
      </div>
      <div className={"px-10 text-base"}></div>
    </div>
  );
}
