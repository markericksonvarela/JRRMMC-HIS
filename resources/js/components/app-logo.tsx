import { useSidebar } from '@/components/ui/sidebar';

export default function AppLogo() {
    const { state } = useSidebar();

    return (
        <div className="flex items-center gap-3">
            {/* Circular Logo */}
<div
    className={`relative shrink-0 rounded-full overflow-hidden bg-white ${
        state === 'collapsed' ? 'h-8 w-8' : 'h-12 w-12'
    }`}
>
    <img
        src="/images/jrrmc_logo.svg"
        alt="Jose Reyes Memorial Medical Center Logo"
        className="absolute inset-0 h-full w-full object-contain"
    />
</div>

            {/* Text */}
            {state === 'expanded' && (
                <div className="text-sm leading-tight">
                    <div className="font-semibold">
                        JOSE R. REYES MEMORIAL MEDICAL CENTER
                    </div>

                </div>
            )}
        </div>
    );
}
