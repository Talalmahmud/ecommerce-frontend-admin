"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const sales = [
  {
    id: "1",
    customer: {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      avatar: "/avatars/01.png",
    },
    amount: 1250.0,
    status: "completed",
    date: "2023-06-12",
  },
  {
    id: "2",
    customer: {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      avatar: "/avatars/02.png",
    },
    amount: 890.5,
    status: "completed",
    date: "2023-06-12",
  },
  {
    id: "3",
    customer: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      avatar: "/avatars/03.png",
    },
    amount: 450.0,
    status: "processing",
    date: "2023-06-11",
  },
  {
    id: "4",
    customer: {
      name: "William Kim",
      email: "will@email.com",
      avatar: "/avatars/04.png",
    },
    amount: 1200.0,
    status: "completed",
    date: "2023-06-11",
  },
  {
    id: "5",
    customer: {
      name: "Sofia Davis",
      email: "sofia.davis@email.com",
      avatar: "/avatars/05.png",
    },
    amount: 275.0,
    status: "failed",
    date: "2023-06-10",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {sales.map((sale) => (
        <div key={sale.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={sale.customer.avatar} alt="Avatar" />
            <AvatarFallback>
              {sale.customer.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {sale.customer.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {sale.customer.email}
            </p>
          </div>
          <div className="ml-auto flex flex-col items-end">
            <p className="text-sm font-medium">${sale.amount.toFixed(2)}</p>
            <Badge
              variant={
                sale.status === "completed"
                  ? "default"
                  : sale.status === "processing"
                  ? "secondary"
                  : "destructive"
              }
              className="mt-1 text-xs"
            >
              {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
}
