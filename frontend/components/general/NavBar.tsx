import { ThemeColorToggle } from "./theme-color-toggle";
import { ThemeModeToggle } from "./theme-mode-toggle";

export default function NavBar() {
  return (
    <div className="flex-1 flex justify-between items-center p-4 w-full border-b border-gray-200 relative">
      <h1 className="text-xl font-bold">Panel de recepcion</h1>
      <div className="flex w-full justify-center rounded-md border p-2 bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto">
        <ThemeColorToggle />
        <ThemeModeToggle />
      </div>
    </div>
  );
}
