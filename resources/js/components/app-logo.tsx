import { useSidebar } from '@/components/ui/sidebar';

export default function AppLogo() {
    const { state } = useSidebar();
    
    return (
        <>
            <div className={`flex items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground transition-all ${state === 'collapsed' ? 'size-8' : 'size-10 aspect-square'}`}>
                <img 
                    src="/images/jrrmc_logo.svg" 
                    alt="Jose Reyes Memorial Medical Center Logo" 
                    className={`w-auto object-contain transition-all ${state === 'collapsed' ? 'h-16' : 'h-20'}`}
                />
            </div>
            {state === 'expanded' && (
                <div className="ml-1 grid flex-1 text-left text-sm">
                    <span className="mb-0.5 text-wrap break-words leading-tight font-semibold">
                        JOSE R. REYES MEMORIAL MEDICAL CENTER
                    </span>
                </div>
            )}
        </>
    );
}