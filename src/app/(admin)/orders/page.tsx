// app/admin/orders/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Order = {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  orderItems: {
    product: {
      _id: string;
      name: string;
      image: string;
      price: number;
    };
    quantity: number;
    price: number;
  }[];
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  deliveredAt?: string;
  createdAt: string;
};

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch order details
  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`/api/admin/orders/${id}`);
  //       const data = await response.json();

  //       if (response.ok) {
  //         setOrder(data);
  //       } else {
  //         toast.error(data.message || "Failed to fetch order details");
  //         router.push("/admin/orders");
  //       }
  //     } catch {
  //       toast.error("Failed to fetch order details");
  //       router.push("/admin/orders");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchOrder();
  // }, [id, router]);

  if (loading) {
    return <div className="p-4">Loading order details...</div>;
  }

  if (!order) {
    return <div className="p-4">Order not found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Order Details</h1>
        <Button variant="outline" onClick={() => router.push("/admin/orders")}>
          Back to Orders
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Order Summary */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16">
                          <Image
                            src={
                              item.product.image || "/placeholder-product.jpg"
                            }
                            alt={item.product.name}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ${item.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">
                      ${item.price.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      ${(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span>Items Price:</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${order.shippingPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Order ID
                </h3>
                <p className="font-mono">{order._id}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Order Date
                </h3>
                <p>{format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Payment Status
                </h3>
                <Badge variant={order.isPaid ? "default" : "destructive"}>
                  {order.isPaid ? "Paid" : "Unpaid"}
                </Badge>
                {order.isPaid && order.paidAt && (
                  <p className="text-sm mt-1">
                    Paid on{" "}
                    {format(new Date(order.paidAt), "MMM d, yyyy h:mm a")}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Order Status
                </h3>
                <Badge
                  variant={
                    order.status === "delivered"
                      ? "default"
                      : order.status === "cancelled"
                      ? "destructive"
                      : order.status === "shipped"
                      ? "outline"
                      : order.status === "processing"
                      ? "secondary"
                      : "secondary"
                  }
                >
                  {order.status}
                </Badge>
                {order.status === "delivered" && order.deliveredAt && (
                  <p className="text-sm mt-1">
                    Delivered on{" "}
                    {format(new Date(order.deliveredAt), "MMM d, yyyy h:mm a")}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Payment Method
                </h3>
                <p className="capitalize">{order.paymentMethod}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Customer
                  </h3>
                  <p>{order.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.user.email}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Shipping Address
                  </h3>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city},{" "}
                    {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.country}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
