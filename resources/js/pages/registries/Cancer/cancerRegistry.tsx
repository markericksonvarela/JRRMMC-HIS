import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { cancer } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Patient } from '@/types/regs/cancerPatient';
import { DataTable } from '@/components/datatable';
import { patientColumns } from './partials/columns';
import { TableSkeleton } from '@/components/skeleton-table';
import { Card } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cancer Registry',
        href: cancer().url,
    },
];

//sample data -- use inertia for backend connection
const sampleData: Patient[] = [
    {
        id: '1',
        name: 'Juan Dela Cruz',
        age: 45,
        diagnosis: 'Lung Cancer',
        stage: 'Stage II',
        dateRegistered: '2024-01-15',
        followUpStatus: 'Form 1',
    },
    {
        id: '2',
        name: 'Maria Santos',
        age: 52,
        diagnosis: 'Breast Cancer',
        stage: 'Stage III',
        dateRegistered: '2024-02-20',
        followUpStatus: 'Form 2',
    },
    {
        id: '3',
        name: 'Pedro Reyes',
        age: 38,
        diagnosis: 'Colon Cancer',
        stage: 'Stage I',
        dateRegistered: '2024-03-10',
        followUpStatus: 'Form 3',
    },
    {
        id: '4',
        name: 'Ana Cruz',
        age: 60,
        diagnosis: 'Liver Cancer',
        stage: 'Stage IV',
        dateRegistered: '2024-03-15',
        followUpStatus: 'Form 4',
    },
    {
        id: '5',
        name: 'Jose Garcia',
        age: 48,
        diagnosis: 'Stomach Cancer',
        stage: 'Stage II',
        dateRegistered: '2024-03-20',
        followUpStatus: 'Form 1',
    },
];

// can be adjusted to followups
const formTabs = [
    {
        label: 'All',
        value: 'all',
        filterKey: 'followUpStatus',
    },
    {
        label: 'Form 1',
        value: 'form1',
        filterKey: 'followUpStatus',
        filterValue: 'Form 1',
    },
    {
        label: 'Form 2',
        value: 'form2',
        filterKey: 'followUpStatus',
        filterValue: 'Form 2',
    },
    {
        label: 'Form 3',
        value: 'form3',
        filterKey: 'followUpStatus',
        filterValue: 'Form 3',
    },
    {
        label: 'Form 4',
        value: 'form4',
        filterKey: 'followUpStatus',
        filterValue: 'Form 4',
    },
];

export default function CancerRegistry() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<Patient[]>([]);

    // sample data -- use inertia for backend connection
    useEffect(() => {
        const timer = setTimeout(() => {
            setData(sampleData);
            setIsLoading(false);
        }, 2000); // data loading for skeleton effect

        return () => clearTimeout(timer);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Cancer Registry" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {isLoading ? (
                    <Card className="border border-sidebar-border/70">
                        <TableSkeleton rows={5} columns={7} />
                    </Card>
                ) : (
                    <DataTable
                        columns={patientColumns}
                        data={data}
                        filterColumn="name"
                        filterPlaceholder="Search Patient"
                        tabs={formTabs}
                    />
                )}
            </div>
        </AppLayout>
    );
}