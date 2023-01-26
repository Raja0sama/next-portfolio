import React, { useEffect, useRef, useState } from "react";

interface refType {
  appendChild(scriptEl: HTMLScriptElement): unknown;
}

const GithubComponent = () => {
  const ref: any = useRef<refType>();
  const [comment, setComment] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    if (comment) return;
    let scriptEl = document.createElement("script");
    scriptEl.setAttribute("src", "https://utteranc.es/client.js");
    scriptEl.setAttribute("crossorigin", "anonymous");
    scriptEl.setAttribute("async", "true");
    scriptEl.setAttribute("repo", "raja0sama/rm-portfolio");
    scriptEl.setAttribute("issue-term", "title");
    scriptEl.setAttribute("theme", "github-dark");
    ref.current?.appendChild(scriptEl);
    setComment(true);
  }, []);
  return <div ref={ref} />;
};
export default GithubComponent;
