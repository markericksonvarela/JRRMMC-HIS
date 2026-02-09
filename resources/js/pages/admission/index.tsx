import { Head, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, Eye, Edit, Trash2, BookHeart, ClipboardPlus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { admission } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/datatable';
import { admissionHelper, AdmissionLog } from '@/helper/admissionHelper';
import { TableSkeleton } from '@/components/skeleton-table';
import { Card } from '@/components/ui/card';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'ADMISSION LOG',
        href: admission().url,
    },
];

interface Ward {
    wardcode: string;
    wardname: string;
}

interface Props{
    ward?: string;
    wardname?: string;
}

// Action handlers remain the same...
const handleView = (enccode: string) => {
    console.log('View:', enccode);
};

const handleEdit = (enccode: string) => {
    console.log('Edit:', enccode);
};

const handleDelete = async (enccode: string, refreshData: () => void) => {
    if (confirm('Are you sure you want to delete this admission?')) {
        try {
            await admissionHelper.delete(enccode);
            console.log('Deleted:', enccode);
            refreshData();
        } catch (error) {
            console.error('Error deleting admission:', error);
            alert('Failed to delete admission. Please try again.');
        }
    }
};

export default function AdmissionIndex({ ward, wardname }: Props) {
    const [data, setData] = useState<AdmissionLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [wards, setWards] = useState<Ward[]>([]);
    
    // Server-side pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(15);

    // Fetch wards on mount
    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await axios.get('/api/wards');
                setWards(response.data.data);
            } catch (error) {
                console.error('Error fetching wards:', error);
            }
        };
        fetchWards();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await admissionHelper.getDatatable({
                page: currentPage,
                per_page: perPage,
                search: globalFilter,
                ward: ward,
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
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [currentPage, perPage, globalFilter, ward]);

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

    const handleWardChange = (wardCode: string, wardName: string) => {
        router.get(admission().url, {
            ward: wardCode,
            wardname: wardName
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleClearWard = () => {
        router.get(admission().url, {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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
            accessorKey: 'patient_name',
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
                            title="SOAP"
                        >
                            <BookHeart className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
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
            <Head title="Admission Department" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {loading ? (
                    <Card className="border border-sidebar-border/70">
                        <TableSkeleton rows={10} columns={9} />
                    </Card>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data}
                        filterColumn="enccode"
                        filterPlaceholder="Search Patient"
                        manualPagination={true}
                        pageCount={lastPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        perPage={perPage}
                        onPerPageChange={handlePerPageChange}
                        total={total}
                        loading={loading}
                        onSearchChange={handleSearchChange}
                        wards={wards}
                        selectedWard={ward}
                        selectedWardName={wardname}
                        onWardChange={handleWardChange}
                        onClearWard={handleClearWard}
                    />
                )}
            </div>
        </AppLayout>
    );
}