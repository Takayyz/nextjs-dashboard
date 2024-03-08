'use server'

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({
  id: true,
  date: true,
});
export const createInvoice = async (formData: FormData) => {
  const {customerId, amount, status} = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  // INFO: to eliminate JavaScript floating-point errors
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  // TODO: Error handling
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  const INVOICES_PAGE_PATH = '/dashboard/invoices';
  revalidatePath(INVOICES_PAGE_PATH);
  redirect(INVOICES_PAGE_PATH);
};

const UpdateInvoice = FormSchema.omit({
  id: true,
  date: true,
});
export const updateInvoice = async (id: string, formData: FormData) => {
  const {customerId, amount, status} = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
    UPDATE invoices
    SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
    WHERE id = ${id}
  `;

  const INVOICES_PAGE_PATH = '/dashboard/invoices';
  revalidatePath(INVOICES_PAGE_PATH);
  redirect(INVOICES_PAGE_PATH);
};
