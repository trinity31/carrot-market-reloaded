export default function Card() {
  return (
    <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm dark:bg-gray-600">
        <input type="text" placeholder="Search here..." />
        <button>Search</button>
        {/* First row */}
        <div className="flex justify-between items-center"> 
          <div className="flex flex-col">
            <span className="text-gray-600 font-semibold -mb-2 dark:text-gray-300">In transit</span>
            <span className="text-3xl font-semibold dark:text-white">Coolblue</span>
          </div>
          <div className="size-12 rounded-full bg-orange-400 " />
        </div>
        {/* Second row */}
        <div className="my-2 flex items-center gap-2">
          <span className="bg-green-400 text-white uppercase px-2.5 py-1.5 text-xs font-medium rounded-full transition hover:bg-green-500 hover:scale-125">Today</span>
          <span className="dark:text-gray-100">9:30-10:30</span>
        </div>
        <div className="relative">
          <div className="bg-gray-200 absolute rounded-full w-full h-2"/>
          <div className="bg-green-400 absolute rounded-full w-2/3 h-2 "/>
        </div>
        {/* Third row */}
        <div className="flex justify-between items-center mt-5 text-gray-600 dark:text-gray-300">
          <span>Expected</span>
          <span>Sorting center</span>
          <span>In transit</span>
          <span className="text-gray-400 dark:text-gray-500">Delivered</span>
        </div>
      </div>
  );
}