export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                <img 
                    src="/images/jrrmc_logo.svg" 
                    alt="Jose Reyes Memorial Medical Center Logo" 
                    className="h-20 w-auto object-contain" 
                />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 text-wrap break-words leading-tight font-semibold">
                    JOSE R. REYES MEMORIAL MEDICAL CENTER
                </span>
            </div>
        </>
    );
}
