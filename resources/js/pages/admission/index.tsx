import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, BookHeart, ClipboardPlus, AlertCircle, Inbox, MessageCircleHeart, FlaskConical, FolderPlus, HeartPulse, NotebookText, FileClock, Info } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { admission } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/datatable';
import { admissionHelper, AdmissionLog } from '@/helper/admissionHelper';
import { TableSkeleton } from '@/components/skeleton-table';
import { Card, CardContent } from '@/components/ui/card';
import { WardFilter } from '@/components/wardfilter';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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

interface Props {
    ward?: string;
    wardname?: string;
}

const formTabs = [
    {
        label: 'Active',
        value: 'active',
        filterKey: 'admstat',
        filterValue: 'A',
    },
    {
        label: 'Discharged',
        value: 'discharged',
        filterKey: 'admstat',
        filterValue: 'I',
    },
    {
        label: 'All',
        value: 'all',
        filterKey: 'admstat',
    },
];

export default function AdmissionIndex({ ward, wardname }: Props) {
    const [data, setData] = useState<AdmissionLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [wards, setWards] = useState<Ward[]>([]);
    const [showWardModal, setShowWardModal] = useState(!ward);
    const [error, setError] = useState<string | null>(null);
    
    const [deleteDialog, setDeleteDialog] = useState({
        open: false,
        enccode: '',
        patientName: '',
    });
    
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(15);
    const [activeTab, setActiveTab] = useState('active');
    const [tabCounts, setTabCounts] = useState<Record<string, number>>({
        all: 0,
        active: 0,
        discharged: 0
    });

    // Use ref to track if we should reset page on search
    const isSearching = useRef(false);

    useEffect(() => {
        const fetchWards = async () => {
            try {
                const response = await axios.get('/api/wards');
                setWards(response.data.data);
            } catch (error) {
                console.error('Error fetching wards:', error);
                setError('Failed to load wards. Please refresh the page.');
            }
        };
        fetchWards();
    }, []);

    const fetchData = useCallback(async () => {
        if (!ward) {
            setLoading(false);
            return;
        }

        try {
            setError(null);
            let statusFilter = '';
            const currentTab = formTabs.find(tab => tab.value === activeTab);
            if (currentTab?.filterValue) {
                statusFilter = currentTab.filterValue;
            }
            setLoading(true);
            const response = await admissionHelper.getDatatable({
                page: currentPage,
                per_page: perPage,
                search: globalFilter,
                ward: ward,
                status: statusFilter,
            });
            
            setData(response.data);
            setCurrentPage(response.current_page);
            setLastPage(response.last_page);
            setTotal(response.total);
            setPerPage(response.per_page);
            if (response.tab_counts) {
                setTabCounts(response.tab_counts);
            }
        } catch (error) {
            console.error('Error fetching admission data:', error);
            setError('Failed to load admission data. Please try again.');
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [currentPage, perPage, globalFilter, ward, activeTab]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchData();
        }, 600); // Increased to 600ms

        return () => clearTimeout(timeoutId);
    }, [fetchData]);

    const handleSearchChange = (search: string) => {
        setGlobalFilter(search);
        // Only reset to page 1 if search value actually changed
        if (search !== globalFilter) {
            setCurrentPage(1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handlePerPageChange = (newPerPage: number) => {
        setPerPage(newPerPage);
        setCurrentPage(1);
    };

    const handleTabChange = (tabValue: string) => {
        setActiveTab(tabValue);
        setCurrentPage(1);
    };

    const handleWardSelect = (wardcode: string, wardname: string) => {
        router.get(admission().url, {
            ward: wardcode,
            wardname: wardname
        });
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

    const handleSOAP = (enccode: string, patientName: string) => {
        console.log('Opening SOAP for:', enccode, patientName);
    };

    const handleDoctorsOrder = (enccode: string, patientName: string) => {
        console.log('Opening Doctor\'s Order for:', enccode, patientName);
    };

    const handleView = (enccode: string) => {
        console.log('View:', enccode);
    };

    const handleEdit = (enccode: string) => {
        console.log('Edit:', enccode);
    };

    const handleDeleteClick = (enccode: string, patientName: string) => {
        setDeleteDialog({
            open: true,
            enccode,
            patientName,
        });
    };

    const handleDeleteConfirm = async () => {
        try {
            await admissionHelper.delete(deleteDialog.enccode);
            console.log('Deleted:', deleteDialog.enccode);
            setDeleteDialog({ open: false, enccode: '', patientName: '' });
            fetchData();
        } catch (error) {
            console.error('Error deleting admission:', error);
            setError('Failed to delete admission. Please try again.');
            setDeleteDialog({ open: false, enccode: '', patientName: '' });
        }
    };

    const handleDeleteCancel = () => {
        setDeleteDialog({ open: false, enccode: '', patientName: '' });
    };

    const columns: ColumnDef<AdmissionLog>[] = [
        {
            accessorKey: 'admdate',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                        aria-label="Sort by admission date"
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
                        aria-label="Sort by hospital number"
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
                        aria-label="Sort by patient name"
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
                    <TooltipProvider>
                        <div className="flex items-center gap-2">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleSOAP(admission.enccode, admission.patient_name)}
                                        aria-label="View SOAP notes"
                                    >
                                        <BookHeart className="size-6 text-green-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>SOAP Notes</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleDoctorsOrder(admission.enccode, admission.patient_name)}
                                        aria-label="View doctor's orders"
                                    >
                                        <ClipboardPlus className="size-6 text-blue-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Doctor's Order</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View nurse's notes"
                                    >
                                        <MessageCircleHeart className="size-6 text-purple-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Nurse's Notes</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View examination"
                                    >
                                        <FlaskConical className="size-6 text-orange-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Examination</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View patient files"
                                    >
                                        <FolderPlus className="size-6 text-amber-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Patient Files</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View vital signs"
                                    >
                                        <HeartPulse className="size-6 text-red-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Vital Signs</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View course in the ward"
                                    >
                                        <NotebookText className="size-6 text-indigo-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Course in the Ward</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View history and diagnosis"
                                    >
                                        <FileClock className="size-6 text-teal-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>History / Diagnosis</p>
                                </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => handleView(admission.enccode)}
                                        aria-label="View patient basic information"
                                    >
                                        <Info className="size-6 text-sky-500" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Patient Information</p>
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    </TooltipProvider>
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admission Department" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                {error && (
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription className="flex items-center justify-between">
                            <span>{error}</span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    setError(null);
                                    fetchData();
                                }}
                            >
                                Retry
                            </Button>
                        </AlertDescription>
                    </Alert>
                )}

                {!ward ? (
                    <Card className="p-8 text-center">
                        <CardContent className="pt-6">
                            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                <BookHeart className="h-6 w-6 text-primary" />
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">Select a Ward</h2>
                            <p className="text-muted-foreground mb-6">
                                Please select a ward to view admission patients
                            </p>
                            <Button onClick={() => setShowWardModal(true)} size="lg">
                                Choose Ward
                            </Button>
                        </CardContent>
                    </Card>
                ) : loading ? (
                    <Card className="border border-sidebar-border/70">
                        <TableSkeleton rows={10} columns={9} />
                    </Card>
                ) : data.length === 0 ? (
                    <Card className="p-12 text-center">
                        <CardContent className="pt-6">
                            <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                <Inbox className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No Admission Records Found</h3>
                            <p className="text-muted-foreground mb-6">
                                {globalFilter 
                                    ? `No results found for "${globalFilter}"`
                                    : `There are no ${activeTab !== 'all' ? activeTab : ''} admission records in ${wardname || 'this ward'}.`
                                }
                            </p>
                            <div className="flex items-center justify-center gap-3">
                                {globalFilter && (
                                    <Button
                                        variant="outline"
                                        onClick={() => setGlobalFilter('')}
                                    >
                                        Clear Search
                                    </Button>
                                )}
                                <Button
                                    variant={globalFilter ? "outline" : "default"}
                                    onClick={() => setShowWardModal(true)}
                                >
                                    Choose Different Ward
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <DataTable
                        columns={columns}
                        data={data}
                        filterColumn="hpercode"
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
                        tabs={formTabs}
                        onTabChange={handleTabChange}
                        activeTabValue={activeTab}
                        tabCounts={tabCounts}
                    />
                )}
            </div>

            <WardFilter
                open={showWardModal}
                onClose={() => setShowWardModal(false)}
                onSelect={handleWardSelect}
                department="admission"
            />

            <AlertDialog open={deleteDialog.open} onOpenChange={handleDeleteCancel}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the admission record for{' '}
                            <span className="font-semibold">{deleteDialog.patientName}</span>.
                            This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleDeleteCancel}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteConfirm}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AppLayout>
    );
}