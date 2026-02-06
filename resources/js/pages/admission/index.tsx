import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { admission } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/datatable';
import { admissionHelper, AdmissionLog } from '@/helper/admissionHelper';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ADMISSION LOG',
        href: admission().url,
    },
];

const columns: ColumnDef<AdmissionLog>[] = [
    {
        accessorKey: 'enccode',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Encounter Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: 'hpercode',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Patient Code
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
];

export default function AdmissionIndex() {
    const [data, setData] = useState<AdmissionLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    
    // Server-side pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(25);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await admissionHelper.getDatatable({
                    page: currentPage,
                    per_page: perPage,
                    search: globalFilter,
                });
                
                setData(response.data);
                setCurrentPage(response.current_page);
                setLastPage(response.last_page);
                setTotal(response.total);
                setPerPage(response.per_page);
            } catch (error) {
                console.error('Error fetching admission data:', error);
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
        setCurrentPage(1); // Reset to first page on search
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admission Log" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={columns}
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
            </div>
        </AppLayout>
    );
}