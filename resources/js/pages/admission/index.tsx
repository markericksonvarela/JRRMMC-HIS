import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Eye, Edit, Trash2, BookHeart, ClipboardPlus } from 'lucide-react';
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

// Action handlers
const handleView = (enccode: string) => {
    console.log('View:', enccode);
    // TODO: Navigate to view page or open modal
    // window.location.href = `/admission/${enccode}`;
};

const handleEdit = (enccode: string) => {
    console.log('Edit:', enccode);
    // TODO: Navigate to edit page or open modal
    // window.location.href = `/admission/${enccode}/edit`;
};

const handleDelete = async (enccode: string, refreshData: () => void) => {
    if (confirm('Are you sure you want to delete this admission?')) {
        try {
            await admissionHelper.delete(enccode);
            console.log('Deleted:', enccode);
            // Refresh the table after successful deletion
            refreshData();
        } catch (error) {
            console.error('Error deleting admission:', error);
            alert('Failed to delete admission. Please try again.');
        }
    }
};

export default function AdmissionIndex() {
    const [data, setData] = useState<AdmissionLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    
    // Server-side pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(15);

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

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData();
        }, 300); // Debounce for 300ms

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
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    // Define columns inside component so we can access fetchData
    const columns: ColumnDef<AdmissionLog>[] = [
        {
            accessorKey: 'admdate',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Admission Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            cell: ({ row }) => {
                const date = row.getValue('admdate') as string;
                return date ? new Date(date).toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                }) : '';
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
                        Hospital Number
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            id: 'patient_name',
            accessorFn: (row) => `${row.patfirst || ''} ${row.patmiddle || ''} ${row.patlast || ''}`.trim(),
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    >
                        Patient Name (FN, MN, LN)
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            id: 'actions',
            header: 'Actions',
            cell: ({ row }) => {
                const admission = row.original;
                
                return (
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() => handleSOAP(admission.enccode)}
                            title="SOAP"
                        >
                            <BookHeart className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            // onClick={() => handleDoctorsOrder(admission.enccode)}
                            title="DOCTORS ORDER"
                        >
                            <ClipboardPlus className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(admission.enccode)}
                            title="View Details"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(admission.enccode)}
                            title="Edit"
                        >
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(admission.enccode, fetchData)}
                            title="Delete"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admission Log" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <DataTable
                    columns={columns}
                    data={data}
                    filterColumn="hpercode"
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