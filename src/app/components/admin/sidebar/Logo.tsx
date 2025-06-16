import { Package2 } from "lucide-react";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
      <Package2 className="h-6 w-6" />
      <span className="">Ecommerce Admin</span>
    </Link>
  );
}
