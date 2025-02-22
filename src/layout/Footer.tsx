import { Link } from "react-router";

const menuItems = [
  { name: "BMI Check", href: "/bmi-check" },
  { name: "Calorie Count", href: "/calorie-count" },
  { name: "Track Progress", href: "/track-progress" },
  { name: "Match Exercises", href: "/match-exercises" },
  { name: "Meal Ideas", href: "/meal-ideas" },
];

export default function Footer() {
  return (
    <div className="flex flex-col justify-center border-blue-500">
      <div className="hidden w-full border-t border-blue-500 px-40 py-8 lg:flex lg:justify-between">
        <div className="flex basis-1/3 flex-col">
          <div className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-[32px] font-semibold text-transparent">
            BeWell Buddies
          </div>
          <p className="text-gray-500">
            Life is a journey, and well-being is the compass that guides us.
            BeWell Buddies helps you navigate the ups and resources and
            encouragement to build a balanced and fulfilling life.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mb-4 bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-[20px] font-semibold text-transparent">
            Feature
          </div>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              className="text-gray-500 transition duration-150 hover:text-blue-600 hover:underline hover:underline-offset-2"
              to={item.href}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
      <div className="mx-5 flex justify-center border-t border-blue-500 py-6 sm:justify-between md:mx-10 lg:mx-20">
        <div className="hidden bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text font-semibold text-transparent sm:block">
          Copyright © 2024
        </div>
        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-center font-semibold text-transparent">
          All Rights Reserved | BeWell Buddies
        </div>
      </div>
    </div>
  );
}
