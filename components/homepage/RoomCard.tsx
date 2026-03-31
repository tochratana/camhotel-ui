import Image from "next/image";
import {RoomCardType} from "@/types/roomCard";

export default function RoomCard({title, tag, image, description, isVip}: RoomCardType) {
    return (
        <div
            className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 shadow-sm border border-slate-100">
            <div className="h-64 overflow-hidden relative">
                <Image src={image} alt={title} width={100} height={100}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                <div
                    className={`absolute top-4 right-4 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${isVip ? 'bg-[#6e2c00]/90 text-[#f39461]' : 'bg-white/90 text-[#00236f]'}`}>
                    {tag}
                </div>
            </div>
            <div className="p-6">
                <h3 className="font-bold text-xl text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-600 mb-6 line-clamp-2">{description}</p>
                <button
                    className="w-full py-3 border border-slate-200 rounded-lg font-bold text-xs uppercase tracking-widest text-[#00236f] hover:bg-[#00236f] hover:text-white transition-colors">
                    View Details
                </button>
            </div>
        </div>
    )
}