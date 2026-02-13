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
<Sidebar
  collapsible="icon"
  variant="sidebar"
  className="h-full bg-zinc-950 border-none shrink-0"
>

    <SidebarHeader className="bg-yellow-500 text-black h-16 flex items-center px-4 border-b border-yellow-600">
    <AppLogo />
</SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t  border-yellow-500 ">
                <span className="block mb-3 text-xs font-semibold text-yellow-400">
                    USER
                </span>
                <NavUser />
            </SidebarFooter>

        </Sidebar>
    );
}
