import { Head, router } from '@inertiajs/react';
import { useState, useEffect, useRef } from 'react';
import AppLayout from '@/layouts/app-layout';
import { cancer } from '@/routes';
import type { BreadcrumbItem, CancerPatient, CancerFilters } from '@/types';
import { DataTable } from '@/components/datatable';
import { patientColumns } from './partials/columns';
import { TableSkeleton } from '@/components/skeleton-table';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import axios from 'axios';

interface Props {
    patients: {
        data: CancerPatient[];
    };
    filters: CancerFilters;
    error?: string;
    tsdesc?: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cancer Registry',
        href: cancer().url,
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

export default function CancerDepartment({ error }: Props) {
    const [data, setData] = useState<CancerPatient[]>([]);
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [globalFilter, setGlobalFilter] = useState('');
    const [debouncedFilter, setDebouncedFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [perPage, setPerPage] = useState(15);
    const [activeTab, setActiveTab] = useState('all');
    const [tabCounts, setTabCounts] = useState<Record<string, number>>({
        all: 0,
        active: 0,
        discharged: 0
    });

    const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                
                let statusFilter = '';
                const currentTab = formTabs.find(tab => tab.value === activeTab);
                if (currentTab?.filterValue) {
                    statusFilter = currentTab.filterValue;
                }
                
                const response = await axios.get('/api/cancer/datatable', {
                    params: {
                        page: currentPage,
                        per_page: perPage,
                        search: debouncedFilter,
                        status: statusFilter,
                    }
                });
                
                setData(response.data.data);
                setCurrentPage(response.data.current_page);
                setLastPage(response.data.last_page);
                setTotal(response.data.total);
                setPerPage(response.data.per_page);
                setTabCounts(response.data.tab_counts || tabCounts);
            } catch (error) {
                console.error('Error fetching cancer data:', error);
            } finally {
                setLoading(false);
                setInitialLoad(false);
            }
        };

        fetchData();
    }, [currentPage, perPage, debouncedFilter, activeTab]);

    const handleSearchChange = (search: string) => {
        setGlobalFilter(search);
        
        if (debounceTimerRef.current) {
            clearTimeout(debounceTimerRef.current);
        }
        
        debounceTimerRef.current = setTimeout(() => {
            setDebouncedFilter(search);
            setCurrentPage(1);
        }, 300);
    };

    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) {
                clearTimeout(debounceTimerRef.current);
            }
        };
    }, []);

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

    if (error) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Cancer Registry" />
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
                <Head title="Cancer Registry" />
                <div className="flex items-center justify-between">
                    <Button
                        onClick={() => router.get('cancer/cancer-form')}
                        className="flex items-center gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Patient
                    </Button>
                </div>
                <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto p-4">
                    {initialLoad ? (
                        <Card className="border border-sidebar-border/70">
                            <TableSkeleton rows={10} columns={9} />
                        </Card>
                    ) : (
                        <DataTable
                            columns={patientColumns}
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
                            tabs={formTabs}
                            onTabChange={handleTabChange}
                            activeTabValue={activeTab}
                            tabCounts={tabCounts}
                        />
                    )}
                </div>
            </AppLayout>
    );
}