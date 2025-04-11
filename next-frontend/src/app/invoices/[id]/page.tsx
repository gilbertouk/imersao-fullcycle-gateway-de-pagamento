import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/status-badge";
import { ArrowLeft, Download, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvoiceDetailsPageProps {
  params: {
    id: string;
  };
}

export default function InvoiceDetailsPage({
  params,
}: InvoiceDetailsPageProps) {
  const invoiceId = `#${params.id}`;

  // Dados de exemplo - nomes de variáveis em inglês, valores em português
  const invoiceData = {
    id: "#INV-001",
    value: "R$ 1.500,00",
    creationDate: "30/03/2025 14:30",
    lastUpdate: "30/03/2025 14:35",
    description: "Compra Online #123",
    status: "Aprovado",
    timeline: [
      {
        title: "Fatura Criada",
        date: "30/03/2025 14:30",
      },
      {
        title: "Pagamento Processado",
        date: "30/03/2025 14:32",
      },
      {
        title: "Transação Aprovada",
        date: "30/03/2025 14:35",
      },
    ],
    paymentMethod: {
      type: "Cartão de Crédito",
      lastDigits: "**** **** **** 1234",
      holder: "João da Silva",
    },
    additionalData: {
      accountId: "ACC-12345",
      clientIp: "192.168.1.1",
      device: "Desktop - Chrome",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="text-gray-400">
              <ArrowLeft size={16} className="mr-1" />
              Voltar
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Fatura {invoiceId}</h1>
          <StatusBadge status="Aprovado" />
        </div>
        <Button
          variant="outline"
          className="border-gray-700 text-white flex items-center gap-1"
        >
          <Download size={16} />
          Download PDF
        </Button>
      </div>
      <p className="text-gray-400">Criada em {invoiceData.creationDate}</p>

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
                {invoiceData.value}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Data de Criação</span>
              <span className="text-white font-medium">
                {invoiceData.creationDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Última Atualização</span>
              <span className="text-white font-medium">
                {invoiceData.lastUpdate}
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
              Status da Transação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {invoiceData.timeline.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-1 text-green-400">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-white font-medium">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.date}</p>
                </div>
              </div>
            ))}
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
                {invoiceData.paymentMethod.type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Últimos Dígitos</span>
              <span className="text-white font-medium">
                {invoiceData.paymentMethod.lastDigits}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Titular</span>
              <span className="text-white font-medium">
                {invoiceData.paymentMethod.holder}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1e2532] border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Dados Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-400">ID da Conta</span>
              <span className="text-white font-medium">
                {invoiceData.additionalData.accountId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">IP do Cliente</span>
              <span className="text-white font-medium">
                {invoiceData.additionalData.clientIp}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dispositivo</span>
              <span className="text-white font-medium">
                {invoiceData.additionalData.device}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
