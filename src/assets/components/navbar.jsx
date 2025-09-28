const Navbar=()=>{
    return (
        <nav className="bg-slate-800  text-white flex justify-around items-center h-15">
            <div className="logo font-bold text-white">
                <span className="text-green-700">&lt;</span>
                Pass
              
                <span className="text-green-700">OP/&gt;</span>
            </div>
            {/* <ul className="flex gap-5">
                <li><a className="hover:font-bold" href="#">Home</a></li>
                <li><a className="hover:font-bold" href="#">About</a></li>
                <li><a className="hover:font-bold" href="#">Contact</a></li>    
            </ul> */}
            <button className="text-white w-25 flex-c gap-2 bg-green-900  hover:bg-green-800 rounded-full p-2 ring-white ring-1">
                <i class="fa-brands fa-github"></i>&nbsp; Github
            </button>
        </nav>
    )
}
export default Navbar;