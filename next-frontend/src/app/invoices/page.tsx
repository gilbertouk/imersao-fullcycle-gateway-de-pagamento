import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "@/components/status-badge";
import { Eye, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react";

// Dados de exemplo - mantenha os nomes de variáveis em inglês, mas os valores em português
const invoices = [
  {
    id: "#INV-001",
    date: "30/03/2025",
    description: "Compra Online #123",
    value: "R$ 1.500,00",
    status: "Aprovado" as const,
  },
  {
    id: "#INV-002",
    date: "29/03/2025",
    description: "Serviço Premium",
    value: "R$ 15.000,00",
    status: "Pendente" as const,
  },
  {
    id: "#INV-003",
    date: "28/03/2025",
    description: "Assinatura Mensal",
    value: "R$ 99,90",
    status: "Rejeitado" as const,
  },
];

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
        <Link href="/invoices/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1">
            <Plus size={16} />
            Nova Fatura
          </Button>
        </Link>
      </div>

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
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-800">
                <td className="py-4 px-4 text-white">{invoice.id}</td>
                <td className="py-4 px-4 text-white">{invoice.date}</td>
                <td className="py-4 px-4 text-white">{invoice.description}</td>
                <td className="py-4 px-4 text-white">{invoice.value}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={invoice.status} />
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/faturas/${invoice.id.replace("#", "")}`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-400"
                      >
                        <Eye size={18} />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400"
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
