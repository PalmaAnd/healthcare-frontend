// src/components/ClientFilters.tsx
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users } from 'lucide-react';

interface ClientFiltersProps {
    onSearchChange: (value: string) => void;
    onUserTypeChange: (value: string) => void;
    onGenderChange: (value: string) => void;
}

export function ClientFilters({ onSearchChange, onUserTypeChange, onGenderChange }: ClientFiltersProps) {
    return (
        <div className="mb-4 flex flex-wrap gap-4">
            <div className="relative max-w-sm">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                    type="text"
                    placeholder="Search clients..."
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-8"
                />
            </div>
            <Select onValueChange={onUserTypeChange}>
                <SelectTrigger className="w-[180px]">
                    <Users className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by User Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All User Types</SelectItem>
                    <SelectItem value="Regular">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                            Regular
                        </span>
                    </SelectItem>
                    <SelectItem value="Premium">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-purple-500 mr-2"></span>
                            Premium
                        </span>
                    </SelectItem>
                    <SelectItem value="VIP">
                        <span className="flex items-center">
                            <span className="w-3 h-3 rounded-full bg-gold-500 mr-2"></span>
                            VIP
                        </span>
                    </SelectItem>
                </SelectContent>
            </Select>
            <Select onValueChange={onGenderChange}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by Gender" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="">All Genders</SelectItem>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
}