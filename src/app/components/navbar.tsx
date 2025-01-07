"use client"
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navigation = [
    { name: 'Home', href: "/"},
    { name: 'Buy', href: "/buy"},
    { name: 'Ratings', href: "neighbourhood-rating"},
]

export default function Navbar() {
    const pathname = usePathname()

    return (
        <nav className="flex items-center justify-between p-6 lg:px-16">
            <div>
                <Link href='/' className=''>
                    <span className='sr-only'>Roofone</span>
                    <Image src="/RoofoneLogo.svg" alt="Roofone"
                        width={50}
                        height={50}
                    />
                </Link>
            </div>
            <div className='lg:flex lg:gap-x-12'>
                {navigation.map((item) => (
                    <Link className={pathname === item.href ? "text-roofone-green": "text-sm/6 font-semibold text-gray-900"} key={item.name} href={item.href}>{item.name}</Link>
                ))}
            </div>
            <div>
                 <Link href='/' className='flex gap-2'>
                    <span className='sr-only'>Github</span>
                    <span>Github</span>
                    <Image src="/github-mark.svg" alt="Gitbub"
                        width={25}
                        height={25}
                    />
                </Link>
            </div>
        </nav>
    )
}