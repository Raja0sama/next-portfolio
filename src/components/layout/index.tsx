import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";

import { Bg, Music } from "@/components/index";

import theme from "../../theme";
import Link from "next/link";
import Image from "next/image.js";

interface propsType {
  disableExtra?: boolean;
  children?: any;
  layout?: any;
  light: boolean;
  id?: string;
  class?: string;
  subClass?: string;
  disableEffect?: boolean;
  onThemeChange?: any;
}
const Layout = ({
  layout = {},
  light = false,
  disableExtra = false,
  disableEffect = true,
  onThemeChange,
  ...props
}: propsType) => {
  const controls = useAnimation();
  const [_light, settoggle] = useState(true);
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "true") settoggle(true);
    if (theme === "false") settoggle(false);
    controls.start((i) => ({
      opacity: 1,
      x: 0,
      z: 4,
      y: 0,
      transition: { delay: 0.3 },
    }));
  }, []);

  useEffect(() => {
    settoggle(light);
  }, [light]);

  const themeToggle = () => {
    settoggle(!_light);
    onThemeChange && onThemeChange(!_light);
  };

  const p: any = layout?.left.reduce((acc: any, curr: any): any => {
    acc[curr.url] = (
      <span className="vertical-rotate">
        <Link href={curr.url}>{curr.label}</Link>
      </span>
    );

    return acc;
  }, {});

  const a = [...layout?.right].map((e: any, i): any => {
    if (layout?.right.length === i) {
      return (
        <Image
          src={"/sound.gif"}
          alt={"Sound.gif"}
          style={{
            width: 35,
            padding: 5,
          }}
        />
      );
    }
    if (e?.link) {
      return (
        <span className="vertical-rotate font-['Nanum_Gothic_Coding']">
          <Link href={e.url}>{e.label}</Link>
        </span>
      );
    }

    return (
      <Link
        legacyBehavior
        key={e.url}
        className="vertical-rotate font-['Nanum_Gothic_Coding']"
        href={e.url}
      >
        {e.label}
      </Link>
    );
  });

  const [pages, setPages] = useState(p);
  let color: "dark" | "light" = _light ? "light" : "dark";

  return (
    <main
      id={`${props?.id || ""}`}
      className={`${props?.class || "relative h-screen w-screen"}  `}
      style={{
        zIndex: 10,
        background: theme[color].backgroundColor,
        color: theme[color].textColor,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
      body {
        background-color : ${theme[color].backgroundColor};
        color : ${theme[color].textColor}
      }
      `,
        }}
      ></style>
      {/* Background Effect */}
      {!disableExtra && !disableEffect && (
        <motion.div
          animate={controls}
          style={{ opacity: 0, zIndex: -1 }}
          custom="5"
          className="fixed h-full w-full pointer-events-none	"
        >
          <Bg {...{ color: _light ? "black" : "" }} />
        </motion.div>
      )}
      <div className="flex w-screen h-screen">
        {!disableExtra && (
          <div className="flex flex-col justify-between">
            <motion.div
              animate={controls}
              style={{ opacity: 0, zIndex: 99 }}
              custom="4"
              className="h-full flex justify-center"
            >
              <div
                className="h-full  mb-1 w-1"
                style={{
                  background: theme[color].textColor,
                }}
              />
            </motion.div>
            <div>
              {Object.entries(pages).map((e: any, i) => (
                <motion.div
                  key={e[0]}
                  layoutId={e[0]}
                  animate={controls}
                  style={{ opacity: 0, zIndex: 99 }}
                  custom={i}
                  className="sm:p-4 py-4 px-2 font-['Nanum_Gothic_Coding']"
                >
                  {e[1]}
                </motion.div>
              ))}
            </div>
          </div>
        )}
        <div className="flex-1">{props.children}</div>
        {!disableExtra && (
          <div
            className={`flex flex-col justify-between ${
              _light ? "border-black" : "border-white"
            } border-l-4`}
          >
            {a.map((e, i) => (
              <motion.div
                key={i}
                animate={controls}
                style={{ opacity: 0, zIndex: 99 }}
                custom={i}
                className="sm:p-4 p-2 vertical-rotate"
              >
                {e}
              </motion.div>
            ))}
            <motion.div
              animate={controls}
              style={{
                opacity: 0,
                zIndex: 99,
                background: _light ? "black" : "white",
                color: !_light ? "black" : "white",
              }}
              onClick={() => themeToggle()}
              className="sm:p-4 p-2 cursor-pointer"
            >
              <span className="vertical-rotate">
                {_light ? "Light" : "Dark"}{" "}
              </span>
            </motion.div>
          </div>
        )}
      </div>
      <Music />
    </main>
  );
};

export default Layout;
