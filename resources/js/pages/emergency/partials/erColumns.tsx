import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import type { Patient } from '@/types';

export const patientColumns: ColumnDef<Patient>[] = [
    // { use if needed
    //     id: 'select',
    //     header: ({ table }) => (
    //         <Checkbox
    //             checked={
    //                 table.getIsAllPageRowsSelected() ||
    //                 (table.getIsSomePageRowsSelected() && 'indeterminate')
    //             }
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //             aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox
    //             checked={row.getIsSelected()}
    //             onCheckedChange={(value) => row.toggleSelected(!!value)}
    //             aria-label="Select row"
    //         />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    // },
    {
        accessorKey: 'erdate',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date/Time Registered
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = row.getValue('erdate') as string;
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
        header: 'Hospital Code',
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('hpercode')}</div>
        ),
    },
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Patient Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue('name')}</div>
        ),
    },
    // {
    //     accessorKey: 'age',
    //     header: ({ column }) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //             >
    //                 Patient Age
    //                 <ArrowUpDown className="ml-2 h-4 w-4" />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }) => (
    //         <div className="text-center">{row.getValue('age')}</div>
    //     ),
    // },
    // {
    //     accessorKey: 'patsex',
    //     header: 'Sex',
    //     cell: ({ row }) => (
    //         <div>{row.getValue('patsex')}</div>
    //     ),
    // },
    {
        accessorKey: 'tsdesc',
        header: 'Service',
        cell: ({ row }) => (
            <div>{row.getValue('tsdesc')}</div>
        ),
    },
    {
        id: 'actions',
        enableHiding: false,
        cell: ({ row }) => {
            const patient = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(patient.hpercode)}
                        >
                            Copy patient code
                        </DropdownMenuItem>
                        <DropdownMenuItem>View patient</DropdownMenuItem>
                        <DropdownMenuItem>Edit details</DropdownMenuItem>
                        <DropdownMenuItem>Records</DropdownMenuItem>
                        <DropdownMenuItem>Doctor's Order</DropdownMenuItem>
                        <DropdownMenuItem>Lab Results</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];