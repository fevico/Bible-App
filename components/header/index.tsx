import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold"><Link href="/">Bible App</Link></h1>
        </header>
    );      
}
 
export default Header;