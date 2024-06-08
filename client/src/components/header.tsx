import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-center h-full">
                <Link href="https://www.linkedin.com/in/rikhi-singh/" target="_blank" passHref>
                    <Button size="default" variant="ghost" className="w-full text-3xl font-bold">
                    <Image
                            src="/logo.svg"
                            alt="Github"
                            height={40}
                            width={40}
                            className="mr-4 rounded -md"
                        />
                        Mentimeter Clone     
                    </Button>
                </Link>
            </div>
        </header>
    );
};