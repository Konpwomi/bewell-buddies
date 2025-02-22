import { Link } from "react-router";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
const menuItems = [
  { name: "BMI Check", href: "/bmi-check" },
  { name: "Calorie Count", href: "/calorie-count" },
  { name: "Track Progress", href: "/track-progress" },
  { name: "Match Exercises", href: "/match-exercises" },
  { name: "Meal Ideas", href: "/meal-ideas" },
];

function Header() {
  return (
    <nav className="sticky top-0 z-30 w-full bg-white/30 px-5 backdrop-blur-sm sm:px-10 xl:px-20">
      <div className="flex h-16 items-center justify-between lg:h-20">
        <div className="flex">
          <Link
            to="/"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-xl font-semibold text-transparent sm:text-2xl lg:text-3xl"
          >
            Bewell Buddies
          </Link>
          <img
            src="../public/logo.png"
            alt="Logo"
            className="mt-1 ml-1 h-3 w-3"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Menu className="h-6 w-6 text-blue-600 sm:h-7 sm:w-7 lg:hidden" />
          </SheetTrigger>
          <SheetContent side="left">
            <Link
              to="/"
              className="border-b border-blue-600 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text p-5 pt-6 text-xl font-semibold text-transparent sm:text-2xl"
            >
              Bewell Buddies
            </Link>
            <div className="flex flex-col space-y-4 border-b-1  border-blue-600 px-5 pb-5 font-semibold">
              {menuItems.map((menu, index) => (
                <Link key={index} to={menu.href} className="">
                  {menu.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <div className="hidden gap-10 text-gray-500  lg:flex">
          {" "}
          {menuItems.map((menu, index) => (
            <Link key={index} to={menu.href} className="transition duration-150 hover:text-blue-600 hover:underline hover:underline-offset-2">
              {menu.name}
            </Link>
          ))}
        </div> 
      </div>
    </nav>
  );
}

export default Header;
