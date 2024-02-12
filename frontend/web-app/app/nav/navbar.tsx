import Search from "@/app/nav/search";
import Logo from "@/app/nav/logo";
import LoginButton from "@/app/nav/LoginButton";
import {getCurrentUser} from "@/app/actions/authActions";
import UserActions from "@/app/nav/userActions";

export default async function Navbar() {
    const user = await getCurrentUser();

    return (
        <header className="sticky t-0 z-50 flex justify-between bg-white p-5 items-center text-gray-800 shadow-md">
            <Logo />
            <Search />
            {user ? (
                <UserActions user={user} />
            ) : (
                <LoginButton />
            )}
        </header>
    )
}
