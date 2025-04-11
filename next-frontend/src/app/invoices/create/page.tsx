import InvoiceForm from "./InvoiceForm";

export default function CreateInvoicePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Criar Nova Fatura</h1>
        <p className="text-gray-400 mt-1">
          Preencha os dados abaixo para processar um novo pagamento
        </p>
      </div>
      <InvoiceForm />
    </div>
  );
}
