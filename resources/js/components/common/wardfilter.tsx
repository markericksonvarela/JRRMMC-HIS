import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SelectFilter } from './selectFilter';

interface Ward {
    wardcode: string;
    wardname: string;
}

interface WardFilterProps {
    open: boolean;
    onClose: () => void;
    onSelect: (wardCode: string, wardName: string) => void;
    department: 'admission' | 'emergency' | 'outpatient';
}

export function WardFilter({ open, onClose, onSelect, department }: WardFilterProps) {
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedWard, setSelectedWard] = useState<string>('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (open) {
            fetchWards();
        }
    }, [open]);

    const fetchWards = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/wards');
            setWards(response.data.data);
        } catch (error) {
            console.error('Error fetching wards:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        if (selectedWard) {
            const ward = wards.find(w => w.wardcode === selectedWard);
            if (ward) {
                onSelect(ward.wardcode, ward.wardname);
                onClose();
            }
        }
    };

    const getDepartmentTitle = () => {
        switch (department) {
            case 'admission':
                return 'Admission';
            case 'emergency':
                return 'Emergency';
            case 'outpatient':
                return 'Outpatient';
            default:
                return 'Department';
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Select Ward - {getDepartmentTitle()}</DialogTitle>
                    <DialogDescription>
                        Choose a ward to view {getDepartmentTitle().toLowerCase()} patients.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="ward">Ward</Label>
                        {loading ? (
                            <div className="flex items-center justify-center h-10 border rounded-md">
                                <Loader2 className="h-4 w-4 animate-spin" />
                            </div>
                        ) : (
    <SelectFilter
        value={selectedWard}
        onChange={setSelectedWard}
        options={wards.map((ward) => ({
            value: ward.wardcode,
            label: ward.wardname,
        }))}
        placeholder="Select a ward"
        className={cn(
            "w-full",
            selectedWard &&
                "border-yellow-500 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
        )}
    />
)
}
                    </div>
                </div>

                <div className="flex justify-end gap-2">
                    <Button
                        variant="outline"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!selectedWard || loading}
                    >
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}