import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/helpers";
import Logo from "../../utils/Icons/Logo";
import Overview from "../../utils/Icons/Overview";

export default function SideBar() {
  const Menus = [
    { title: "Overview", icon: <Overview />, link: "/" },
    {
      title: "Starships ",
      icon: <div className="h-[17px] w-[17px] bg-[#A9C1FF] rounded-r5 mr-10" />,
      link: "/startships",
    },
    {
      title: "People",
      icon: <div className="h-[17px] w-[17px] bg-[#FFA9EC] rounded-r5 mr-10" />,
      link: "/people",
    },
    {
      title: "Species",
      icon: <div className="h-[17px] w-[17px] bg-[#FDFFA9] rounded-r5 mr-10" />,
      link: "/species",
    },
  ];

  return (
    <>
      <aside className="bg-primary border-r border-r-[#eceef2] h-full fixed left-0 top-0 w-[27.2rem] z-[10] flex flex-col">
        <div className="pt-24 flex justify-center h-[7.2rem]">
          <Logo />
        </div>

        <div className="flex-2 overflow-auto pb-40 mt-20">
          <ul className={cn("pt-2 pl-20 max-[900px]:pl-10 pr-20")}>
            {Menus.map((menu, index) => (
              <>
                <NavLink
                  to={menu.link as string}
                  key={index}
                  className={({ isActive }) => {
                    return isActive
                      ? "bg-blue text-white mb-[2.4rem] font-medium text-sm gap-x-4 flex items-center cursor-pointer h-[4.5rem] px-8 transition duration-200 hover:bg-blue hover:text-white rounded-md"
                      : "text-white mb-[2.4rem] font-medium text-sm gap-x-4 flex items-center cursor-pointer h-[4.5rem] px-8 transition duration-200 hover:bg-blue hover:text-white rounded-md";
                  }}
                >
                  <span
                    className={cn("text-2xl pl-10 block float-left", {
                      "ml-[6px]": menu.title !== "Overview",
                    })}
                  >
                    {menu.icon}
                  </span>
                  <span className="flex-1 duration-200 pl-4">{menu.title}</span>
                </NavLink>
              </>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
}
