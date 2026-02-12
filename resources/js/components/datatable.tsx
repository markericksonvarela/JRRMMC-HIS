import { useState, useEffect, useRef } from 'react';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Ward {
    wardcode: string;
    wardname: string;
}

interface Service {
    tscode: string;
    tsdesc: string;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filterColumn?: string;
    filterPlaceholder?: string;
    tabs?: {
        label: string;
        value: string;
        filterKey: string;
        filterValue?: string;
    }[];
    manualPagination?: boolean;
    pageCount?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    perPage?: number;
    onPerPageChange?: (perPage: number) => void;
    total?: number;
    loading?: boolean;
    onSearchChange?: (search: string) => void;
    wards?: Ward[];
    selectedWard?: string;
    selectedWardName?: string;
    onWardChange?: (wardCode: string, wardName: string) => void;
    onClearWard?: () => void;
    onTabChange?: (tabValue: string) => void;
    activeTabValue?: string;
    tabCounts?: Record<string, number>;
    service?: Service[];
    selectedService?: string;
    selectedServiceName?: string;
    onServiceChange?: (serviceCode: string, serviceName: string) => void;
    onClearService?: () => void;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filterColumn,
    filterPlaceholder = 'Filter...',
    tabs,
    manualPagination = false,
    pageCount = 1,
    currentPage = 1,
    onPageChange,
    perPage = 100,
    onPerPageChange,
    total = 0,
    loading = false,
    onSearchChange,
    wards,
    selectedWard,
    selectedWardName,
    onWardChange,
    onClearWard,
    service,
    selectedService,
    selectedServiceName,
    onServiceChange,
    onClearService,
    onTabChange,
    activeTabValue,
    tabCounts,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [activeTab, setActiveTab] = useState(activeTabValue || tabs?.[0]?.value || 'all');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [localSearchValue, setLocalSearchValue] = useState('');

    useEffect(() => {
        if (activeTabValue !== undefined) {
            setActiveTab(activeTabValue);
        }
    }, [activeTabValue]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: manualPagination ? undefined : getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        manualPagination,
        pageCount,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const handleTabChange = (value: string) => {
        setActiveTab(value);
        const tab = tabs?.find(t => t.value === value);
        
        if (onTabChange) {
            onTabChange(value);
        }
        
        if (!manualPagination && tab && tab.filterValue) {
            table.getColumn(tab.filterKey)?.setFilterValue(tab.filterValue);
        } else if (!manualPagination) {
            tabs?.forEach(t => {
                table.getColumn(t.filterKey)?.setFilterValue(undefined);
            });
        }
    };

    const getFilteredRowCount = (tab: { value: string; filterKey: string; filterValue?: string }) => {
        if (manualPagination && tabCounts) {
            return tabCounts[tab.value] || 0;
        }
        
        if (manualPagination) {
            return tab.value === activeTab ? total : 0;
        }

        if (!tab.filterValue) {
            return data.length;
        }
        return data.filter((row: any) => row[tab.filterKey] === tab.filterValue).length;
    };

    const tableContent = (
        <>
            {/* search patient, ward filter, and column visibility */}
            <div className="flex items-center justify-between gap-4 p-4 border-b">
                <div className="flex items-center gap-2 flex-1">
                    {filterColumn && (
                        <Input
                            ref={searchInputRef}
                            placeholder={filterPlaceholder}
                            value={localSearchValue}
                            onChange={(event) => {
                                const value = event.target.value;
                                setLocalSearchValue(value);
                                if (onSearchChange) {
                                    onSearchChange(value);
                                }
                            }}
                            className="max-w-sm"
                        />
                    )}
                    
                    {/* wards */}
                    {wards && wards.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Select
                                value={selectedWard}
                                onValueChange={(value) => {
                                    const ward = wards.find(w => w.wardcode === value);
                                    if (ward && onWardChange) {
                                        onWardChange(ward.wardcode, ward.wardname);
                                    }
                                }}
                            >
                                <SelectTrigger
                                    className={cn(
                                        "w-[250px] transition-colors",
                                        "focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-0",
                                        "data-[state=open]:ring-2 data-[state=open]:ring-yellow-500",
                                        "data-[state=open]:border-yellow-500",
                                        selectedWard &&
                                        "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                                    )}
                                    >
                                    <SelectValue placeholder="Select Ward">
                                        {selectedWardName || "All Wards"}
                                    </SelectValue>
                                    </SelectTrigger>

                                <SelectContent className="border-yellow-500/30">
                                    {wards.map((ward) => (
                                        <SelectItem
                                            key={ward.wardcode}
                                            value={ward.wardcode}
                                            className="
                                                focus:bg-yellow-500/10
                                                focus:text-yellow-700
                                                dark:focus:text-yellow-400
                                            "
                                            >
                                            {ward.wardname}
                                            </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}

                    {/* service */}
                    {service && service.length > 0 && (
                        <div className="flex items-center gap-2">
                            <Select
                                value={selectedService}
                                onValueChange={(value) => {
                                    const selected = service.find(s => s.tscode === value);
                                    if (selected && onServiceChange) {
                                        onServiceChange(selected.tscode, selected.tsdesc);
                                    }
                                }}
                            >
                                <SelectTrigger className="w-[250px]" showClear={!!selectedService} onClear={selectedService ? onClearService : undefined}>
                                    <SelectValue placeholder="Select Service">
                                        {selectedServiceName || "All Services"}
                                    </SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {service.map((svc) => (
                                        <SelectItem key={svc.tscode} value={svc.tscode}>
                                            {svc.tsdesc}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>
            </div>

            {/* main table */}
            <div className="relative overflow-auto">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef.header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* table footer -- pagination */}
            <div className="flex items-center justify-between space-x-2 p-4 border-t">
                {manualPagination ? (
                    <>
                        <div className="flex items-center space-x-2">
                            <p className="text-sm text-muted-foreground">Rows per page:</p>
                            <select
                                value={perPage}
                                onChange={(e) => {
                                    if (onPerPageChange) {
                                        onPerPageChange(Number(e.target.value));
                                    }
                                }}
                                className="h-8 w-[70px] rounded-md border bg-background px-2 text-sm"
                            >
                                {[15, 25, 50, 100].map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}
                            </select>
                            <p className="text-sm text-muted-foreground">
                                Showing {data.length} of {total.toLocaleString()} entries
                            </p>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange?.(1)}
                                disabled={currentPage === 1 || loading}
                            >
                                First
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange?.(currentPage - 1)}
                                disabled={currentPage === 1 || loading}
                            >
                                Previous
                            </Button>
                            <span className="text-sm">
                                Page {currentPage} of {pageCount}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange?.(currentPage + 1)}
                                disabled={currentPage === pageCount || loading}
                            >
                                Next
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onPageChange?.(pageCount)}
                                disabled={currentPage === pageCount || loading}
                            >
                                Last
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex-1 text-sm text-muted-foreground">
                            Showing {table.getFilteredRowModel().rows.length > 0 ? '1' : '0'}-{table.getRowModel().rows.length} of{' '}
                            {table.getFilteredRowModel().rows.length} entries
                        </div>
                        <div className="flex items-center space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </>
    );

    if (!tabs || tabs.length === 0) {
        return (
            <Card className="border border-sidebar-border/70">
                {tableContent}
            </Card>
        );
    }

    return (
        <Card className="border border-sidebar-border/70">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <div className="border-b px-4 pt-4">
                    <TabsList className="bg-transparent border-b-0 p-0 h-auto">
                        {tabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-yellow-500 data-[state=active]:bg-yellow-500/10 data-[state=active]:text-yellow-700 dark:data-[state=active]:text-yellow-400 dark:data-[state=active]:border-yellow-400 dark:data-[state=active]:bg-yellow-400/10 data-[state=active]:shadow-none px-4 pb-3 transition-colors"
                            >
                                {tab.label}
                                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-normal data-[state=active]:bg-yellow-500/20 dark:data-[state=active]:bg-yellow-400/20 data-[state=active]:text-yellow-700 dark:data-[state=active]:text-yellow-400">
                                    {getFilteredRowCount(tab).toLocaleString()}
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="m-0">
                        {tableContent}
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    );
}