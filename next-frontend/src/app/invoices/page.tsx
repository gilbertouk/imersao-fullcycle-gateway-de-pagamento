import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { InvoiceList } from "./invoice-list";

export default function InvoicesDetailsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Faturas</h1>
          <p className="text-gray-400 mt-1">
            Gerencie suas faturas e acompanhe os pagamentos
          </p>
        </div>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"
          asChild
        >
          <Link href="/invoices/create">
            <Plus size={16} />
            Nova Fatura
          </Link>
        </Button>
      </div>
      <InvoiceList />
    </div>
  );
}
