import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
    return (
        <footer className="lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto gap-4 md:flex md:flex-row md:items-center md:justify-center md:pt-8">
                <Link href="https://github.com/RikhiSingh" target="_blank" passHref>
                    <Button size="lg" variant="ghost" className="w-full sm:my-4 md:my-0">
                        <Image
                            src="/github.svg"
                            alt="Github"
                            height={40}
                            width={40}
                            className="mr-4 rounded -md"
                        />
                        RikhiSingh
                    </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/rikhi-singh/" target="_blank" passHref>
                    <Button size="lg" variant="ghost" className="w-full sm:my-4 md:my-0">
                        <Image
                            src="/linkedIn.png"
                            alt="LinkedIn"
                            height={43}
                            width={43}
                            className="mr-4 rounded -md"
                        />       
                        rikhi-singh                 
                    </Button>
                </Link>
                <Link href="https://www.instagram.com/rikhi_singh/" target="_blank" passHref>
                    <Button size="lg" variant="ghost" className="w-full sm:my-4 md:my-0">
                        <Image
                            src="/igLogo.svg"
                            alt="Instagram"
                            height={40}
                            width={40}
                            className="mr-4 rounded -md"
                        />    
                        rikhi_singh                    
                    </Button>
                </Link>
            </div>
        </footer>
    );
};