import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Patient, CancerStage } from '@/types/regs/cancerPatient';

const stageBadgeVariant = (stage: CancerStage) => {
    switch (stage) {
        case 'Stage I':
            return 'default';
        case 'Stage II':
            return 'secondary';
        case 'Stage III':
            return 'outline';
        case 'Stage IV':
            return 'destructive';
        default:
            return 'default';
    }
};

export const patientColumns: ColumnDef<Patient>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
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
    {
        accessorKey: 'age',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Age
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const age = row.getValue('age') as number;
            return <div>{age} years</div>;
        },
    },
    {
        accessorKey: 'diagnosis',
        header: 'Diagnosis',
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue('diagnosis')}</div>
        ),
    },
    {
        accessorKey: 'stage',
        header: 'Stage',
        cell: ({ row }) => {
            const stage = row.getValue('stage') as CancerStage;
            return (
                <Badge variant={stageBadgeVariant(stage)}>
                    {stage}
                </Badge>
            );
        },
    },
    {
        accessorKey: 'dateRegistered',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Date Registered
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('dateRegistered'));
            return <div>{date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
            })}</div>;
        },
    },
    {
        accessorKey: 'followUpStatus',
        header: 'Follow-up Status',
        cell: ({ row }) => {
            const status = row.getValue('followUpStatus') as string;
            return status ? (
                <Badge variant="outline">{status}</Badge>
            ) : (
                <span className="text-muted-foreground">N/A</span>
            );
        },
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
                            onClick={() => navigator.clipboard.writeText(patient.id)}
                        >
                            Copy patient ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>View patient</DropdownMenuItem>
                        <DropdownMenuItem>Edit details</DropdownMenuItem>
                        <DropdownMenuItem>Schedule follow-up</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];