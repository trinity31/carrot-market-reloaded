export default function Searchbar() {
    return (
      <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col md:flex-row gap-2 *:outline-none has-[:invalid]:ring-red-100 ">
            <input className="w-full rounded-full h-12 bg-gray-200 pl-5  ring ring-transparent focus:ring-green-500 transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer" type="email" placeholder="Search here..." />
            <span className="text-red-500 text-sm peer-invalid:block hidden">Please enter a valid email address</span>
            <button className="bg-black text-white py-2 rounded-full active:scale-90 focus:scale-90 transition-transform font-medium  md:px-10  peer-invalid:bg-red-100">Search</button>
      </div>
    
  );
}