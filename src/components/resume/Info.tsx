export function Info({ data }: any) {
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
      <div className={"px-10 text-base font-normal	"}>
        <span className={"tracking-widest text-2xl text-center"}>
          {data.name}
          <span className={"font-light"}>{data.age}</span>
        </span>
        {data.list.map((e: any) => (
          <p key={e[0]} className="text-lg">
            <span>{e[0]}</span>
            <span className={"font-light"}>{e[1]}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
