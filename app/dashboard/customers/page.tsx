import { Metadata } from "next";
import Table from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from "@/app/lib/data";

export const metadata: Metadata = {
  title: 'Customers',
};

const Page = async ({
  searchParams,
}: {
  searchParams: {
    query?: string;
  },
}) => {
  const customers = await fetchFilteredCustomers(searchParams?.query || '');

  return <Table customers={customers} />;
};

export default Page;
