import { Link } from '@inertiajs/react';
import { BookOpen, Dna, Folder, LayoutGrid, SquareUserRound, Stethoscope, Brain, Accessibility, Hand, Ambulance, Hospital, University } from 'lucide-react';
// import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard, patrecord, registries, trauma, cancer, geria, skin, admission, emergency, outpatient } from '@/routes';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';

//Add sidebar navigation items here, including nested children items, copy format below, add to import as per href
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Departments',
        icon: University,
        children: [
            {
                title: 'Admission',
                href: admission(),
                icon: Hospital,
            },
            {
                title: 'Emergency',
                href: emergency(),
                icon: Ambulance,
            },
            {
                title: 'Outpatient',
                href: outpatient(),
                icon: Accessibility,
            },
        ],
    },
    {
        title: 'Registries',
        href: registries(),
        icon: Stethoscope,
        children: [
            {
                title: 'Trauma Registry',
                href: trauma(),
                icon: Brain,
            },
            {
                title: 'Cancer Registry',
                href: cancer(),
                icon: Dna,
            },
            {
                title: 'Geria Registry',
                href: geria(),
                icon: Accessibility,
            },
            {
                title: 'Skin Registry',
                href: skin(),
                icon: Hand,
            },
        ],
    },
    {
        title: 'Patient Records',
        href: patrecord(),
        icon: SquareUserRound,
    },
];

//for reference
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <span className="block mb-2 text-sm font-semibold text-muted-foreground">User Management</span>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
