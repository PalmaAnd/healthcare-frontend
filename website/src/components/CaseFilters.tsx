import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, AlertTriangle } from 'lucide-react';

interface CaseFiltersProps {
    onSearchChange: (value: string) => void;
    onUrgencyChange: (value: string) => void;
    onStatusChange: (value: string) => void;
}

export function CaseFilters({ onSearchChange, onUrgencyChange, onStatusChange }: CaseFiltersProps) {
    return (
        <div className="mb-4 flex flex-wrap gap-4">
            <div className="relative max-w-sm">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search cases..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-8"
                />
            </div>
            <Select onValueChange={onUrgencyChange}>
                <SelectTrigger className="w-[180px]">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by Urgency" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Urgencies</SelectItem>
                    <SelectItem value="Low">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                            Low
                        </span>
                    </SelectItem>
                    <SelectItem value="Medium">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                            Medium
                        </span>
                    </SelectItem>
                    <SelectItem value="High">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-orange-500 mr-2"></span>
                            High
                        </span>
                    </SelectItem>
                    <SelectItem value="Critical">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                            Critical
                        </span>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={onStatusChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Statuses</SelectItem>
                    <SelectItem value="Open">Open</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Closed">Closed</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}