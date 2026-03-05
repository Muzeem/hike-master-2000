import { notFound } from 'next/navigation';
import { fetchData } from '@/lib/fetchData';
import { AchievementClient } from '@/components/achievement/AchievementClient';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const data = await fetchData();
  return data.achievements.map((achievement) => ({
    id: achievement.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = await fetchData();
  const achievement = data.achievements.find((a) => a.id === id);
  if (!achievement) return { title: 'Not Found' };
  return {
    title: `${achievement.title} · Brag Dashboard`,
    description: achievement.description ?? achievement.metric,
  };
}

export default async function AchievementPage({ params }: PageProps) {
  const { id } = await params;
  const data = await fetchData();
  const achievement = data.achievements.find((a) => a.id === id);
  if (!achievement) notFound();
  return <AchievementClient achievement={achievement} />;
}
