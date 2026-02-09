import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/app-layout';
import { outpatient } from '@/routes';
import type { BreadcrumbItem, Patient, OutpatientFilters } from '@/types';
import { DataTable } from '@/components/datatable';
import { patientColumns } from './partials/opdColumns'
import axios from 'axios';
import { TableSkeleton } from '@/components/skeleton-table';
import { Card } from '@/components/ui/card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Outpatient Department',
        href: outpatient().url,
    },
];

interface Props {
    patients: {
        data: Patient[];
    };
    filters: OutpatientFilters;
    error?: string;
}

export default function OutpatientDepartment({ patients, filters, error }: Props) {
    const [isLoading ] = useState(false);
    const [data, setData] = useState<Patient[]>( [] );
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(100);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/outpatient/outpatientDatatable', {
                    params: {
                        page: currentPage,
                        per_page: perPage,
                        search: globalFilter,
                    }
                });
                
                setData(response.data.data);
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
                setTotal(response.data.total);
                setPerPage(response.data.per_page);
            } catch (error) {
                console.error('Error fetching outpatient data:', error);
            } finally {
                setLoading(false);
            }
        };

        const timeoutId = setTimeout(() => {
            fetchData();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [currentPage, perPage, globalFilter]);

    const handleSearchChange = (search: string) => {
        setGlobalFilter(search);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    if (error) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Outpatient Department" />
                <div className="flex h-full items-center justify-center p-4">
                    <Card className="p-6 max-w-md">
                        <div className="text-center">
                            <h3 className="text-lg font-semibold text-destructive mb-2">
                                Error Loading Data
                            </h3>
                            <p className="text-muted-foreground mb-4">{error}</p>
                            <button
                                onClick={() => router.reload()}
                                className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                            >
                                Try Again
                            </button>
                        </div>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Outpatient Department" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {loading ? (
                    <Card className="border border-sidebar-border/70">
                        <TableSkeleton rows={10} columns={9} />
                    </Card>
                ) : (
                    <DataTable
                        columns={patientColumns}
                        data={data}
                        filterColumn="enccode"
                        filterPlaceholder="Search admissions..."
                        manualPagination={true}
                        pageCount={lastPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        perPage={perPage}
                        onPerPageChange={handlePerPageChange}
                        total={total}
                        loading={loading}
                        onSearchChange={handleSearchChange}
                    />
                )}
            </div>
        </AppLayout>
    );
}