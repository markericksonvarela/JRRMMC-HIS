import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
// import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { patrecord, admission, emergency, outpatient } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { HousePlus, Ambulance, ShieldPlus } from "lucide-react";
import { WardFilter } from '@/components/common/wardfilter';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Patient Records',
        href: patrecord().url,
    },
];

type Department = 'admission' | 'emergency' | 'outpatient';

export default function PatientRecord() {
    const [showWardModal, setShowWardModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<Department>('admission');

    const handleDepartmentClick = (dept: Department) => {
        if (dept === 'admission') {
            setSelectedDepartment(dept);
            setShowWardModal(true);
        } else {
            if (dept === 'emergency') {
                setSelectedDepartment(dept);
                router.visit(emergency().url);
            } else if (dept === 'outpatient') {
                setSelectedDepartment(dept);
                router.visit(outpatient().url);
            }
        }
    };

    const handleWardSelect = (wardcode: string, wardname: string) => {
        router.get(admission().url, {
            ward: wardcode,
            wardname: wardname
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="PatientRecord" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div onClick={() => handleDepartmentClick('admission')}>
                        <Card className="h-40 cursor-pointer bg-green-500 hover:bg-green-600 text-white transition-all hover:scale-[1.03] hover:shadow-xl">
                            <CardHeader className="flex h-full items-center justify-center">
                                <CardTitle>
                                    <div className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                                        <HousePlus className="h-10 w-10" />
                                        ADMISSION
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div onClick={() => handleDepartmentClick('emergency')}>
                        <Card className="h-40 cursor-pointer bg-red-500 hover:bg-red-600 text-white transition-all hover:scale-[1.03] hover:shadow-xl">
                            <CardHeader className="flex h-full items-center justify-center">
                                <CardTitle>
                                    <div className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                                        <Ambulance className="h-10 w-10" />
                                        EMERGENCY
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>

                    <div onClick={() => handleDepartmentClick('outpatient')}>
                        <Card className="h-40 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white transition-all hover:scale-[1.03] hover:shadow-xl">
                            <CardHeader className="flex h-full items-center justify-center">
                                <CardTitle>
                                    <div className="flex items-center gap-3 text-3xl font-extrabold tracking-tight">
                                        <ShieldPlus className="h-10 w-10" />
                                        OUTPATIENT
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>

            <WardFilter
                open={showWardModal}
                onClose={() => setShowWardModal(false)}
                onSelect={handleWardSelect}
                department={selectedDepartment}
            />
        </AppLayout>
    );
}