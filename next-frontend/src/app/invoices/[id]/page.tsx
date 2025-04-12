import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { ArrowLeft, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cookies } from "next/headers";

interface Invoice {
  id: string;
  account_id: string;
  amount: number;
  status: "approved" | "pending" | "rejected";
  description: string;
  payment_type: string;
  card_last_digits: string;
  created_at: string;
  updated_at: string;
}

export async function getInvoice(id: string) {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/invoice/${id}`,
    {
      headers: {
        "X-API-KEY": apiKey as string,
      },
      cache: "force-cache",
      next: {
        tags: [`accounts/${apiKey}/invoices/${id}`],
      },
    }
  );
  return response.json();
}

export default async function InvoiceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const invoiceData: Invoice = await getInvoice(id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="text-gray-400" asChild>
            <Link href="/invoices">
              <ArrowLeft size={16} className="mr-1" />
              Voltar
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-white">
            Fatura {invoiceData.id}
          </h1>
          <StatusBadge status={invoiceData.status} />
        </div>
        <Button
          variant="outline"
          className="border-gray-700 text-black flex items-center gap-1"
        >
          <Download size={16} />
          Download PDF
        </Button>
      </div>
      <p className="text-gray-400">
        Criada em {new Date(invoiceData.created_at).toLocaleDateString()}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1e2532] border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Informações da Fatura
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">ID da Fatura</span>
              <span className="text-white font-medium">{invoiceData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Valor</span>
              <span className="text-white font-medium">
                {invoiceData.amount}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Data de Criação</span>
              <span className="text-white font-medium">
                {new Date(invoiceData.created_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Descrição</span>
              <span className="text-white font-medium">
                {invoiceData.description}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e2532] border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Método de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Tipo</span>
              <span className="text-white font-medium">
                {invoiceData.payment_type === "credit_card"
                  ? "Cartão de Crédito"
                  : "Boleto"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Últimos Dígitos</span>
              <span className="text-white font-medium">
                {invoiceData.card_last_digits}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
