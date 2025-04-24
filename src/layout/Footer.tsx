export default function Footer() {
  return (
    <div className="font-nunito border-t px-8 py-5 text-sm font-bold">
      <div className="hidden w-full max-w-[1400px] lg:mx-auto lg:flex lg:justify-between">
        <p>
          Copyright <span className="text-green-600">©</span> 2025
        </p>
        <span className="text-green-600"></span>
        <p>
          All Rights Reserved <span className="text-green-600">|</span> BeWell
          Buddies
        </p>
      </div>
      <p className="block text-center lg:hidden">
        © 2025 BeWell Buddies <span className="text-green-600">|</span> All
        rights reserved.
      </p>
    </div>
  );
}
