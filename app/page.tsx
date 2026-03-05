import { fetchData } from '@/lib/fetchData';
import { DashboardClient } from '@/components/DashboardClient';

export default async function HomePage() {
  const data = await fetchData();
  return <DashboardClient data={data} />;
}
