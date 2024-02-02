import {AiOutlineCar} from "react-icons/ai";
import Search from "@/app/nav/search";
import Logo from "@/app/nav/logo";

export default function Navbar() {
    return (
        <header className="sticky t-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
            <Logo />
            <Search />
            <div>Login</div>
        </header>
    )
}
