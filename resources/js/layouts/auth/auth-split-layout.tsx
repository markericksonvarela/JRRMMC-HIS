import { Link, usePage } from '@inertiajs/react';
import { home } from '@/routes';
import type { AuthLayoutProps, SharedData } from '@/types';

export default function AuthSplitLayout({
    children,
}: AuthLayoutProps) {
    const { name } = usePage<SharedData>().props;

    return (
        <div className="relative grid min-h-dvh grid-cols-1 lg:grid-cols-2">
            <div className="relative hidden h-full min-h-dvh flex-col p-10 text-white lg:flex">
                <video
                    className="absolute inset-0 h-full w-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/videos/jrfacade.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-zinc-900/20" />

                <div className="relative z-20">
                    <img
                        src="/images/jrrmc_logo.svg"
                        alt="JRRMC Logo"
                        className="h-40 w-auto drop-shadow-2xl"
                    />
                </div>
            </div>

<div
    className="min-h-dvh transition-[background] duration-300"
    onMouseMove={(e) => {
        const { left, top, width, height } =
            e.currentTarget.getBoundingClientRect();

        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;

        e.currentTarget.style.background =
            `radial-gradient(circle at ${x}% ${y}%, 
                #fde68a 0%, 
                #fdba74 35%, 
                #f59e0b 70%)`;
    }}
    onMouseLeave={(e) => {
        e.currentTarget.style.background =
            'linear-gradient(135deg, #fde68a, #fdba74, #f59e0b)';
    }}
>
    <div className="flex min-h-dvh items-center justify-center px-8">
        {children}
    </div>
</div>

        </div>
    );
}