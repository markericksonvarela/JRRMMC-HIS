import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, BookHeart, Inbox } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { admission } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { DataTable } from '@/components/datatable';
import { admissionHelper, AdmissionLog } from '@/helper/admissionHelper';
import { WardFilter } from '@/components/wardfilter';
import { ErrorAlert } from '@/components/common/errorAlert';
import { EmptyState } from '@/components/common/emptyState';
import { LoadingTable } from '@/components/common/loadingTable';
import { ConfirmDialog } from '@/components/common/confirmDialog';
import { RowActions } from './partials/rowActions';
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

    // Action handlers
    const handleSOAP = (enccode: string, patientName: string) => {
        console.log('Opening SOAP for:', enccode, patientName);
    };

    const handleDoctorsOrder = (enccode: string, patientName: string) => {
        console.log('Opening Doctor\'s Order for:', enccode, patientName);
    };

    const handleNursesNotes = (enccode: string) => {
        console.log('Opening Nurse\'s Notes for:', enccode);
    };

    const handleExamination = (enccode: string) => {
        console.log('Opening Examination for:', enccode);
    };

    const handlePatientFiles = (enccode: string) => {
        console.log('Opening Patient Files for:', enccode);
    };

    const handleVitalSigns = (enccode: string) => {
        console.log('Opening Vital Signs for:', enccode);
    };

    const handleCourseInWard = (enccode: string) => {
        console.log('Opening Course in the Ward for:', enccode);
    };

    const handleHistoryDiagnosis = (enccode: string) => {
        console.log('Opening History/Diagnosis for:', enccode);
    };

    const handlePatientInfo = (enccode: string) => {
        console.log('Opening Patient Information for:', enccode);
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
                    <RowActions
                        admission={admission}
                        onSOAP={handleSOAP}
                        onDoctorsOrder={handleDoctorsOrder}
                        onNursesNotes={handleNursesNotes}
                        onExamination={handleExamination}
                        onPatientFiles={handlePatientFiles}
                        onVitalSigns={handleVitalSigns}
                        onCourseInWard={handleCourseInWard}
                        onHistoryDiagnosis={handleHistoryDiagnosis}
                        onPatientInfo={handlePatientInfo}
                    />
                );
            },
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admission Department" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
               {error && (
                <ErrorAlert
                    message={error}
                    onRetry={() => {
                    setError(null);
                    fetchData();
                    }}
                />
                )}


                {!ward ? (
                    <EmptyState
                        icon={<BookHeart className="h-6 w-6 text-primary" />}
                        title="Select a Ward"
                        description="Please select a ward to view admission patients"
                        actions={
                            <Button onClick={() => setShowWardModal(true)} size="lg">
                            Choose Ward
                            </Button>
                        }
                        />

                ) : loading ? (
                    <LoadingTable rows={10} columns={9} />


                ) : data.length === 0 ? (
                    <EmptyState
                        icon={<Inbox className="h-8 w-8 text-muted-foreground" />}
                        title="No Admission Records Found"
                        description={
                            globalFilter
                            ? `No results found for "${globalFilter}"`
                            : `There are no ${
                                activeTab !== 'all' ? activeTab : ''
                                } admission records in ${wardname || 'this ward'}.`
                        }
                        actions={
                            <>
                            {globalFilter && (
                                <Button
                                variant="outline"
                                onClick={() => setGlobalFilter('')}
                                >
                                Clear Search
                                </Button>
                            )}
                            <Button
                                variant={globalFilter ? 'outline' : 'default'}
                                onClick={() => setShowWardModal(true)}
                            >
                                Choose Different Ward
                            </Button>
                            </>
                        }
                        />

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

            <ConfirmDialog
                open={deleteDialog.open}
                onOpenChange={(open) =>
                    setDeleteDialog({ open, enccode: '', patientName: '' })
                }
                title="Delete Admission Record"
                description={
                    <>
                    This will permanently delete the admission record for{' '}
                    <span className="font-semibold">
                        {deleteDialog.patientName}
                    </span>.
                    <br />
                    This action cannot be undone.
                    </>
                }
                confirmText="Delete"
                cancelText="Cancel"
                destructive
                onConfirm={handleDeleteConfirm}
                />
        </AppLayout>
    );
}
