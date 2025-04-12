import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Invoice {
  id: string;
  created_at: string;
  description: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
}

export async function getInvoices() {
  "use server";
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoices`, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey as string,
    },
    cache: "force-cache",
    next: {
      tags: [`accounts/${apiKey}/invoices`],
    },
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices");
  }

  const data = await response.json();

  return data;
}

export async function InvoiceList() {
  const invoices = await getInvoices();

  return (
    <div>
      <div className="bg-[#1e2532] p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Status
            </label>
            <Select>
              <SelectTrigger className="bg-[#2a3343] border-gray-700 text-white">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="aprovado">Aprovado</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="rejeitado">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label
              htmlFor="dataInicial"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Data Inicial
            </label>
            <Input
              id="dataInicial"
              type="date"
              placeholder="dd/mm/aaaa"
              className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="dataFinal"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Data Final
            </label>
            <Input
              id="dataFinal"
              type="date"
              placeholder="dd/mm/aaaa"
              className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label
              htmlFor="buscar"
              className="block text-sm font-medium text-gray-400 mb-1"
            >
              Buscar
            </label>
            <Input
              id="buscar"
              placeholder="ID ou descrição"
              className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                ID
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                DATA
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                DESCRIÇÃO
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                VALOR
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                STATUS
              </th>
              <th className="text-left py-3 px-4 text-gray-400 font-medium text-sm">
                AÇÕES
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice: Invoice) => (
              <tr key={invoice.id} className="border-b border-gray-800">
                <td className="py-4 px-4 text-white">{invoice.id}</td>
                <td className="py-4 px-4 text-white">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </td>
                <td className="py-4 px-4 text-white">{invoice.description}</td>
                <td className="py-4 px-4 text-white">R$ {invoice.amount}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400 hover:bg-gray-700"
                      asChild
                    >
                      <Link href={`/invoices/${invoice.id}`}>
                        <Eye size={18} />
                      </Link>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400 hover:bg-gray-700"
                    >
                      <Download size={18} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Mostrando 1 - 3 de 50 resultados
        </div>
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-gray-700"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="default"
            size="sm"
            className="h-8 w-8 bg-indigo-600 text-white"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-gray-700"
          >
            2
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 border-gray-700"
          >
            3
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 border-gray-700"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
