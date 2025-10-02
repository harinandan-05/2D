export default function Chat(){
    return (
        <div className="bg-white min-h-screen min-w-screen flex">
            {/* sidebar */}
            <div className="bg-gray-200 min-h-screen w-60 flex-col">
                 <div className="text-black text-1xl pl-7 pt-5">2D-CURSOR</div>
                <div className="text-black pl-7 pt-10 "><button className="cursor-pointer">New Chat</button></div>
            </div>
        </div>
    )
}