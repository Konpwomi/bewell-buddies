import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "BMI Check",
    path: "/bmi-check",
  },
  {
    name: "Calorie Count",
    path: "/calorie-count",
  },
  {
    name: "Track Progress",
    path: "/track-progress",
  },
  {
    name: "Match Exercises",
    path: "/match-exercises",
  },
  {
    name: "Meal Ideas",
    path: "/meal-ideas",
  },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-background/30 font-nunito sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between px-8">
        <div className="relative flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold">Bewell Buddies</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute -top-0 -right-4 text-green-600"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6 text-black" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Access all sections of Bewell Buddies
                </SheetDescription>
              </SheetHeader>
              <div className="mt-10 flex flex-col gap-4 p-7">
                {routes.map((route) => (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-green-600",
                      location.pathname === route.path
                        ? "text-green-600"
                        : "text-foreground",
                    )}
                  >
                    {route.name}
                  </Link>
                ))}
                <div className="mt-4 space-y-2">
                  <Button className="w-full" variant="outline">
                    Sign In
                  </Button>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Sign Up
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 lg:flex">
          {routes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-green-600",
                location.pathname === route.path
                  ? "text-green-600"
                  : "text-foreground",
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button className="font-semibold" variant="ghost">
            Sign In
          </Button>
          <Button className="bg-green-600 font-semibold hover:bg-green-700">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
