"use client";

import AppLayout from '@/components/layouts/app-layout';
import { useAuth } from '@/hooks/use-auth';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import type { User } from '@/lib/types';

function AdminDashboard() {
  const { users, currentUser, updateUserRole } = useAuth();
  
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="text-center">
        <h1 className="font-headline text-3xl font-bold">Access Denied</h1>
        <p className="text-muted-foreground">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users and their permissions.</p>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell><Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role}</Badge></TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => alert('Viewing details for ' + user.name)}>
                        View user details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {user.role !== 'admin' && (
                        <DropdownMenuItem onClick={() => updateUserRole(user.id, 'admin')}>
                            Promote to Admin
                        </DropdownMenuItem>
                      )}
                      {user.role === 'admin' && user.id !== currentUser.id && (
                        <DropdownMenuItem onClick={() => updateUserRole(user.id, 'member')}>
                            Demote to Member
                        </DropdownMenuItem>
                      )}
                      {user.id !== currentUser.id && <DropdownMenuItem className="text-destructive">Deactivate user</DropdownMenuItem>}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default function AdminPage() {
    return (
        <AppLayout>
            <AdminDashboard />
        </AppLayout>
    )
}
