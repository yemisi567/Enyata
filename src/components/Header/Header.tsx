import Notification from "../../utils/Icons/Notifications";
import AvatarIcon from "../../utils/Icons/Avatar";
import MoreIcon from "../../utils/Icons/MoreIcon";
import { useLocation, useNavigate } from "react-router-dom";
import Chevron from "../../utils/Icons/Chevron";
import { cn } from "../../utils/helpers";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  let isSmallerScreen = false;

  if (window) {
    isSmallerScreen = window && window.matchMedia("(max-width: 768px)").matches;
  }

  return (
    <div className="w-full bg-white flex items-center h-[7.2rem] border-b border-b-[#eceef2] shadow-sm py-0 px-48 c:px-10 mb-3 shadow-[0px 1px 5px rgba(0, 0, 0, 0.03)]">
      {location.pathname.includes("details") && (
        <button
          className="flex items-center gap-8 max-[768px]:ml-20"
          onClick={() => navigate(-1)}
        >
          {" "}
          <Chevron />
          <p className="text-base text-[#A4A7B7] font-normal"> Back</p>
        </button>
      )}

      <div
        className={cn("flex items-center gap-x-10 ml-auto mr-24", {
          hidden: location.pathname.includes("details") && isSmallerScreen,
        })}
      >
        <div className="cursor-pointer mr-24">
          <Notification />
        </div>
        <div className="h-20 w-[1.5px] bg-[#E7E7E7]  mr-24" />
        <div>
          <div className="flex items-center gap-[0.8rem]">
            <AvatarIcon />
            <span className="flex items-center cursor-pointer gap-[1.6rem] ml-24">
              <span className="text-sm font-medium capitalize">
                Alegbe Yemisi
              </span>
            </span>
            <span className="ml-48">
              <MoreIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
