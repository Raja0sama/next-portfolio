export function Bio({ data }: any) {
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
      <div className={"px-10 text-base"}>
        <p
          className={"	font-light text-lg	"}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </div>
  );
}
