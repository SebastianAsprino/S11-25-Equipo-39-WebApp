import NavBar from "@/components/navBar/NavBar";
import HealthIcon from "@/icons/HealthIcon";
import HomeIcon from "@/icons/HomeIcon";
import MenuIcon from "@/icons/MenuIcon";
import NutritionIcon from "@/icons/NutritionIcon";
import PetsIcon from "@/icons/PetsIcon";

interface Props {
  children?: React.ReactNode;
}

const DrawerSide = ({ children }: Props) => {
  return (
    <div className="drawer lg:drawer-open relative">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <NavBar />
        <main className="w-full flex flex-1">{children}</main>
        <label
          htmlFor="my-drawer-3"
          className="btn left-3 p-2 top-3 absolute drawer-button lg:hidden"
        >
          <MenuIcon />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="flex flex-col bg-base-200 min-h-full w-80 p-4">
            <a href="/dashboard" className="font-bold px-2 text-2xl text-white mb-5">pet<span className="text-green-500">Health</span></a>
          {/* Sidebar content here */}
          <li className="flex py-3 px-2 rounded gap-2 items-center hover:bg-base-100">
            <HomeIcon />
            <a className="block w-full" href="/dashboard">inicio</a>
          </li>
          <li className="flex py-3 px-2 rounded gap-2 items-center hover:bg-base-100">
            <PetsIcon />
            <a className="block w-full" href="/dashboard/pets">mis mascotas</a>
          </li>
          <li className="flex py-3 px-2 rounded gap-2 items-center hover:bg-base-100">
            <HealthIcon />
            <a className="block w-full" href="/dashboard/health">salud</a>
          </li>
          <li className="flex py-3 px-2 rounded gap-2 items-center hover:bg-base-100">
            <NutritionIcon />
            <a className="block w-full" href="/dashboard/nutrition">nutricion</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerSide;
