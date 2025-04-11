"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreditCard, Lock } from "lucide-react";
import { createInvoiceAction } from "./create-invoice-action";

export default function InvoiceForm() {
  return (
    <form action={createInvoiceAction}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-300"
            >
              Valor
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                R$
              </span>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0,00"
                defaultValue={159.9}
                className="pl-10 bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-300"
            >
              Descrição
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Descreva o motivo do pagamento"
              defaultValue={"Pagamento de fatura"}
              className="min-h-[120px] bg-[#2a3343] border-gray-700 text-white"
            />
          </div>
        </div>

        <div className="bg-[#1e2532] p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-medium text-white mb-4">
            Dados do Cartão
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="cardNumber"
                className="block text-sm font-medium text-gray-300"
              >
                Número do Cartão
              </label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="0000000000000000"
                  defaultValue={"1234567890123456"}
                  maxLength={16}
                  className="pr-10 bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
                />
                <CreditCard
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="expiryDate"
                  className="block text-sm font-medium text-gray-300"
                >
                  Data de Expiração
                </label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/AA"
                  defaultValue={"12/25"}
                  maxLength={5}
                  className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="cvv"
                  className="block text-sm font-medium text-gray-300"
                >
                  CVV
                </label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  defaultValue={"123"}
                  maxLength={3}
                  className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="cardHolderName"
                className="block text-sm font-medium text-gray-300"
              >
                Nome no Cartão
              </label>
              <Input
                id="cardHolderName"
                name="cardHolderName"
                defaultValue={"Fulano de Tal"}
                placeholder="Como aparece no cartão"
                className="bg-[#2a3343] border-gray-700 text-white placeholder-gray-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* <div className="bg-[#1e2532] p-6 rounded-lg border border-gray-700 mt-6">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Subtotal</span>
            <span className="text-white">R$ 0,00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Taxa de Processamento (2%)</span>
            <span className="text-white">R$ 0,00</span>
          </div>
          <div className="border-t border-gray-700 pt-3 flex justify-between">
            <span className="font-medium text-white">Total</span>
            <span className="font-medium text-white">R$ 0,00</span>
          </div>
        </div>
      </div> */}

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" className="border-gray-700 text-white">
          Cancelar
        </Button>
        <Button
          className="bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1"
          type="submit"
        >
          <Lock size={16} />
          Processar Pagamento
        </Button>
      </div>
    </form>
  );
}
