import AppLogoIcon from '@/components/app-logo-icon';
import { SharedData } from '@/types';
import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { Link, usePage } from '@inertiajs/react';
import { Facebook, Instagram, Menu, MessageCircle, Youtube } from 'lucide-react';
import { createContext, Fragment, ReactNode, useContext, useState } from 'react';

export const HomeLayout = ({ children }: { children: ReactNode }) => {
    return (
        <HomeProvider>
            <HeaderComponent />
            <main>{children}</main>
            <FooterComponent />
        </HomeProvider>
    );
};

export const HeaderComponent = () => {
    const { menus, socials, sidebarOpen, setSidebarOpen, appName, quote }: any = UseHome();

    return (
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href={route('blog')} className="relative z-20 flex items-center text-lg font-medium">
                        <AppLogoIcon className="mr-2 size-8 fill-current" />
                        {appName}
                    </Link>

                    {/* Desktop Menu */}
                    <nav className="hidden space-x-8 md:flex md:items-center">
                        {menus.map((item: any) => {
                            const isDonate = item.name.toLowerCase() === 'donasi';

                            return isDonate ? (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className="block w-32 rounded-md bg-slate-600 px-3 py-2 text-center text-xs font-semibold text-white transition hover:bg-blue-700"
                                >
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <Link key={item.name} href={item.href} className="text-xs font-medium text-gray-700 hover:text-blue-600">
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Button */}
                    <button onClick={() => setSidebarOpen(true)} className="p-2 text-gray-700 hover:text-blue-600 md:hidden">
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Sidebar Mobile */}
            <Transition show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 md:hidden" onClose={setSidebarOpen}>
                    {/* Backdrop */}
                    <TransitionChild
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/30" />
                    </TransitionChild>

                    <div className="fixed inset-0 flex">
                        {/* Sidebar Panel */}
                        <TransitionChild
                            as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <DialogPanel className="relative flex h-full w-80 flex-col rounded-r-2xl bg-white shadow-2xl">
                                {/* Header */}
                                <div className="flex items-center justify-between border-b px-6 py-4">
                                    <Link href={route('blog')} className="flex items-center text-lg font-semibold">
                                        <AppLogoIcon className="mr-2 h-8 w-8 fill-current" />
                                        {appName}
                                    </Link>
                                </div>

                                {/* Menu */}
                                <nav className="flex flex-1 flex-col space-y-2 px-6 py-4">
                                    {menus.map((item: any) => {
                                        const isDonate = item.name.toLowerCase() === 'donasi';

                                        return isDonate ? (
                                            // Button biru full width untuk mobile
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                onClick={() => setSidebarOpen(false)}
                                                className="mt-4 block w-full rounded-md bg-slate-600 px-3 py-2 text-center font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        ) : (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block rounded-lg px-3 py-2 text-gray-700 transition hover:bg-blue-50 hover:text-blue-600"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span>{item.name}</span>
                                            </Link>
                                        );
                                    })}
                                </nav>

                                {/* Socials */}
                                <div className="border-t bg-slate-700 px-6 py-6 text-center text-white">
                                    <p className="mb-4 text-sm font-semibold tracking-wide">Follow Us</p>
                                    <div className="flex justify-center space-x-4">
                                        {socials.map((item: any) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 hover:bg-white/20"
                                            >
                                                <item.icon className="h-5 w-5" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </DialogPanel>
                        </TransitionChild>

                        {/* Klik area sisa layar */}
                        <div className="w-1/2" onClick={() => setSidebarOpen(false)} />
                    </div>
                </Dialog>
            </Transition>
        </header>
    );
};

export const FooterComponent = () => {
    const { socials }: any = UseHome();

    return (
        <footer className="bg-slate-800 pt-12 pb-6 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Grid 4 kolom */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
                    {/* Kolom 1 */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Tentang Kami</h3>
                        <p className="text-sm text-gray-200">
                            Yayasan Peduli Ummat berkomitmen membantu masyarakat melalui program sosial, pendidikan, dan kesehatan.
                        </p>
                    </div>

                    {/* Kolom 2 */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Program Kami</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Donasi & Zakat
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Beasiswa Pendidikan
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Bantuan Kesehatan
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Pengembangan UMKM
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3 */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Tautan Cepat</h3>
                        <ul className="space-y-2 text-sm text-gray-200">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Tentang
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Galeri
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Kontak
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 4 */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Hubungi Kami</h3>
                        <p className="text-sm text-gray-200">Jl. Amal No.45, Surabaya, Indonesia</p>
                        <p className="mt-2 text-sm text-gray-200">Email: info@peduliummat.org</p>
                        <p className="mt-2 text-sm text-gray-200">Telp: +62 812 3456 7890</p>
                        <div className="mt-4 flex space-x-3">
                            {socials.map((item: any) => (
                                <Link key={item.name} href={item.href} className="text-white hover:text-gray-300">
                                    <item.icon className="h-5 w-5" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 border-t border-white pt-4 text-center text-sm text-gray-300">
                    &copy; {new Date().getFullYear()} Yayasan Peduli Ummat. Semua hak dilindungi.
                </div>
            </div>
        </footer>
    );
};

export const HomeContext = createContext({});

export const UseHome = () => useContext(HomeContext);

export const HomeProvider = ({ children }: { children: ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { name, quote } = usePage<SharedData>().props;

    const menus = [
        { name: 'Home', href: '/home' },
        { name: 'Tentang', href: '/about' },
        { name: 'Layanan', href: '/services' },
        { name: 'Program', href: '/programs' },
        { name: 'Publikasi', href: '/publications' },
        { name: 'Blog', href: '/blog' },
        { name: 'Donasi', href: '/donasi' },
    ];

    const socials = [
        { name: 'Facebook', href: '#', icon: Facebook },
        { name: 'Instagram', href: '#', icon: Instagram },
        { name: 'Youtube', href: '#', icon: Youtube },
        { name: 'Whatsapp', href: '#', icon: MessageCircle },
    ];

    const contextValue = {
        menus,
        socials,
        sidebarOpen,
        setSidebarOpen,
        appName: name,
        quote,
    };

    return <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>;
};
