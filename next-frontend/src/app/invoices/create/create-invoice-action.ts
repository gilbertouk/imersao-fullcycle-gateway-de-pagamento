"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function createInvoiceAction(formData: FormData) {
  const cookiesStore = await cookies();
  const apiKey = cookiesStore.get("apiKey")?.value;
  const amount = formData.get("amount");
  const description = formData.get("description");
  const cardNumber = formData.get("cardNumber");
  const [expiryMonth, expiryYear] = formData
    .get("expiryDate")!
    .toString()
    .split("/");
  const cvv = formData.get("cvv");
  const cardHolderName = formData.get("cardHolderName");

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey as string,
    },
    body: JSON.stringify({
      amount: parseFloat(amount as string),
      description,
      payment_type: "credit_card",
      card_number: cardNumber,
      cvv,
      expiry_month: parseInt(expiryMonth as string),
      expiry_year: parseInt(expiryYear as string),
      cardholder_name: cardHolderName,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  revalidateTag(`accounts/${apiKey}/invoices`);
  revalidateTag(`accounts/${apiKey}/invoices/${data.id}`);

  redirect("/invoices");
}
