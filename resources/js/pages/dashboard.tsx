import { Head, Link } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard, admission, emergency, outpatient } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { HousePlus, Ambulance, ShieldPlus } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <Link href={admission().url}>
                        <Card className="h-40 cursor-pointer bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-[1.03] hover:shadow-xl">
                            <CardHeader className="flex h-full items-center justify-center">
                                <CardTitle>
                                    <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                                        <HousePlus className="h-10 w-10" />
                                        ADMISSION
                                    </h1>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>


                    <Link href={emergency().url}>
                        <Card className="h-40 cursor-pointer bg-red-500 hover:bg-red-600 text-white transition-all hover:scale-[1.03] hover:shadow-xl">
                            <CardHeader className="flex h-full items-center justify-center">
                                <CardTitle>
                                    <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                                        <Ambulance className="h-10 w-10" />
                                        EMERGENCY
                                    </h1>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>

                    <Link href={outpatient().url}>
                        <Card className="h-40 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white transition-all hover:scale-[1.03] hover:shadow-xl">
                            <CardHeader className="flex h-full items-center justify-center">
                                <CardTitle>
                                    <h1 className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                                        <ShieldPlus className="h-10 w-10" />
                                        OUTPATIENT
                                    </h1>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}