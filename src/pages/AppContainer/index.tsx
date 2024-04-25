import { Outlet } from "react-router-dom";
import SideBar from "../../components/SideBar";
import React from "react";
import Header from "../../components/Header/Header";

export default function AppContainer() {
  return (
    <div>
      <div className="flex">
        <SideBar />
        <div className="h-[100vh] ml-[27rem] flex-1" id="main">
          <Header />
          <main id="main">
            <div className="pl-48 pr-32">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
