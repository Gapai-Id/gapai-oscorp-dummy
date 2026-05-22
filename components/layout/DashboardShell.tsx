'use client';

import { Briefcase, ChevronRight, ClipboardList, ListChecks, Upload, UsersRound } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';

const NAV = [
  { id: 'candidates', label: 'Candidate Management', icon: UsersRound },
  { id: 'screening', label: 'Screening', icon: Upload },
  { id: 'jobs', label: 'Jobs', icon: Briefcase },
  { id: 'stages', label: 'Stages', icon: ListChecks },
  { id: 'jakers', label: 'Jakers', icon: ClipboardList },
];

interface Props {
  activeNav: string;
  onNavChange: (nav: string) => void;
  children: React.ReactNode;
}

export function DashboardShell({ activeNav, onNavChange, children }: Props) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar collapsible="icon" className="border-r">
          <SidebarHeader className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
                <span className="text-white font-semibold text-sm">G</span>
              </div>
              <div>
                <h1 className="font-semibold text-sm">Gapai</h1>
                <p className="text-xs text-muted-foreground">Recruitment Platform</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {NAV.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton isActive={isActive} className="w-full justify-start cursor-pointer" onClick={() => onNavChange(item.id)}>
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Admin User</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="min-w-0">
          <header className="flex h-14 items-center gap-2 border-b px-6">
            <span className="text-sm font-medium text-muted-foreground">
              {NAV.find(n => n.id === activeNav)?.label}
            </span>
          </header>
          <main className="flex-1 p-6 overflow-y-auto overflow-x-hidden">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
