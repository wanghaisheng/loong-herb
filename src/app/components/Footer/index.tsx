import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
export default function Footer({
    className
}: {
    className?: string

}) {
    return (
        <footer className={`w-full mt-16 px-8 md:px-16 flex items-center justify-center ${className}`}>
            <div className="mb-32 md:mb-8 flex flex-col max-w-screen-2xl w-full">
                <div className="flex flex-col md:flex-row gap-2 items-end justify-between">
                    <div className="flex flex-col md:flex-row text-left">
                        <div className="flex justify-center">
                            <div className="font-bold text-2xl transition-all py-1">
                                <Link href="/" className="flex gap-1 text-2xl items-center hover:text-primary transition-all">
                                    <Image src="/icon.svg" alt="logo of Tenryou" width={45} height={45} className="drop-shadow-icon" />
                                    <h2 className="whitespace-nowrap">Tenryou</h2>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <ul className="md:mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:justify-end lg:gap-12 font-semibold">
                        <Link href="/characters" className="hover:text-primary transition-all">
                            <h2>Characters</h2>
                        </Link>
                        <Link href="/users" className="hover:text-primary transition-all">
                            <h2>Users</h2>
                        </Link>
                        <Link href="/teambuilder" className="hover:text-primary transition-all">
                            <h2>Team Builder</h2>
                        </Link>
                        <Link href="/database" className="hover:text-primary transition-all">
                            <h2>Database</h2>
                        </Link>
                    </ul>
                </div>
                <div className="w-full flex md:flex-row flex-col md:justify-between items-end mt-4">
                    <div className="flex gap-2">
                        <p>Your Genshin Impact Companion Site | V1.0</p>
                        {/* <Link href={"https://enka.network"} target="__blank">
                        <Image src={`/icons/enka.png`} width={200} height={150} alt="Enka.network " className="" />
                    </Link> */}
                    </div>
                    <div className="flex gap-2 -mt-2">
                        <div className="flex justify-end items-end">
                            {/* <Link href="https://github.com/pho86/Tenryou" target="__blank" className="hover:text-primary transition-all text-xl p-1">
                                <p className="hidden">Github Icon</p>
                                <FaGithub />
                            </Link> */}
                        </div>
                        <p className="mt-8 text-end text-sm text-gray-200">
                            This website is not affiliated with miHoYo, and all assets are property of original owners.
                        </p>
                    </div>
                </div>
            </div>
        </footer>

    )
}