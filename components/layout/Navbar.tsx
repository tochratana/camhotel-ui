import {navBarData} from "@/lib/data/menuData";

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#6D7698] backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
                <div className="text-2xl font-bold tracking-tighter text-[#00236f] dark:text-blue-100 font-sans">
                    CamHotel
                </div>
                <div className="hidden md:flex items-center space-x-8">
                    {navBarData.map((item, index) => (
                        <a
                            key={index}
                            href={`${item.link}`}
                            className="text-sm tracking-wide uppercase font-semibold text-slate-600 hover:text-[#00236f] transition-colors dark:text-blue-100 dark:hover:text-blue-300"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
                <button
                    className="bg-linear-to-br from-[#00236f] to-[#1e3a8a] text-white px-6 py-2 rounded-lg font-bold text-sm tracking-wide transition-transform active:scale-95">
                    Login
                </button>
            </div>
        </nav>
    )
}