import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Home, Calendar, FileText, Users, Pill, MessageSquare, Settings, LogOut, Paperclip, PersonStanding, PhoneCall, DoorOpen, CaseLower, File } from 'lucide-react';

const sidebarItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard' },
    { icon: Paperclip, label: 'Blog', href: '/blog' },
    { icon: Calendar, label: 'Appointments', href: '/appointments' },
    { icon: File, label: 'Cases', href: '/cases' },
    { icon: FileText, label: 'Patient Records', href: '/patients' },
    { icon: Users, label: 'Clients', href: '/clients' },
    { icon: Pill, label: 'Prescriptions', href: '/prescriptions' },
    { icon: MessageSquare, label: 'Messages', href: '/messages' },
    { icon: PhoneCall, label: 'Telemedicine', href: '/telemedicine' },
    { icon: DoorOpen, label: 'Patient Portal', href: '/portal' },
];

export function Sidebar() {
    return (
        <div className="w-64 bg-white border-r border-gray-200">
            <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <h1 className="text-xl font-semibold">HealthCare Plus</h1>
                </div>
                <ScrollArea className="flex-1">
                    <nav className="p-4 space-y-2">
                        {sidebarItems.map((item) => (
                            <Button key={item.href} variant="ghost" className="w-full justify-start" asChild>
                                <a href={item.href}>
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </a>
                            </Button>
                        ))}
                    </nav>
                </ScrollArea>
                <div className="p-4 border-t border-gray-200">
                    <Button variant="ghost" className="w-full justify-start">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                    </Button>
                    <Button variant="ghost" className="w-full justify-start text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}