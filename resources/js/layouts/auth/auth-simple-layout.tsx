import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center">
            <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/videos/jrfacade.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/50" />

            <div className="absolute left-6 top-6 z-20">
                <img
                    src="/images/jrrmc_logo.svg"
                    alt="JRRMC Logo"
                    className="h-32 w-auto drop-shadow-2xl select-none"
                />
            </div>

            <div className="relative z-20 w-full max-w-md px-6">
                {children}
            </div>
        </div>
    );
}