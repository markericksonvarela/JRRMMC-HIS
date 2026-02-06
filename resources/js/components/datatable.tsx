import { useState } from 'react';
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ChevronDown } from 'lucide-react';

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
    // Server-side pagination props
    manualPagination?: boolean;
    pageCount?: number;
    currentPage?: number;
    onPageChange?: (page: number) => void;
    perPage?: number;
    onPerPageChange?: (perPage: number) => void;
    total?: number;
    loading?: boolean;
    onSearchChange?: (search: string) => void;
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
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [activeTab, setActiveTab] = useState(tabs?.[0]?.value || 'all');

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: manualPagination ? undefined : () => ({ rows: data, rowsById: {} }),
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
        
        if (tab && tab.filterValue) {
            table.getColumn(tab.filterKey)?.setFilterValue(tab.filterValue);
        } else {
            tabs?.forEach(t => {
                table.getColumn(t.filterKey)?.setFilterValue(undefined);
            });
        }
    };

    const getFilteredRowCount = (tab: { filterKey: string; filterValue?: string }) => {
        if (!tab.filterValue) {
            return manualPagination ? total : data.length;
        }
        return data.filter((row: any) => row[tab.filterKey] === tab.filterValue).length;
    };

    const TableContent = () => (
        <>
            {/* search patient and column */}
            <div className="flex items-center justify-between p-4 border-b">
                {filterColumn && (
                    <Input
                        placeholder={filterPlaceholder}
                        value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ''}
                        onChange={(event) => {
                            const value = event.target.value;
                            table.getColumn(filterColumn)?.setFilterValue(value);
                            // Call server-side search if enabled
                            if (manualPagination && onSearchChange) {
                                onSearchChange(value);
                            }
                        }}
                        className="max-w-sm"
                    />
                )}
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
                                {[25, 50, 100, 200].map((size) => (
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
                <TableContent />
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
                                className="relative rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-3"
                            >
                                {tab.label}
                                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-normal">
                                    {getFilteredRowCount(tab)}
                                </span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>
                {tabs.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="m-0">
                        <TableContent />
                    </TabsContent>
                ))}
            </Tabs>
        </Card>
    );
}