export function NavBar() {
  return (
    <div className="mb-2 flex items-center justify-between justify-self-start py-2 text-black sm:mb-6 dark:text-white">
      <h1 className="text-lg font-bold">My Fintech</h1>
      <div className="flex items-center gap-x-2 rounded-full p-2 transition-all hover:bg-gray-200 dark:hover:bg-gray-800">
        <div className="grid h-8 w-8 place-items-center rounded-full border border-gray-800 bg-gray-800 text-white">
          J
        </div>
        <span>John Doe</span>
      </div>
    </div>
  );
}
