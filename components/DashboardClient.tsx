'use client';

import { useState, useMemo } from 'react';
import { DataProvider } from '@/context/DataContext';
import type { BragData } from '@/lib/data';
import { StatCarousel } from '@/components/dashboard/StatCarousel';
import { Header } from '@/components/dashboard/Header';
import { TimelineTab } from '@/components/tabs/TimelineTab';
import { CodeActivityTab } from '@/components/tabs/CodeActivityTab';
import { SkillsTab } from '@/components/tabs/SkillsTab';
import { TestimonialsTab } from '@/components/tabs/TestimonialsTab';
import { BadgesTab } from '@/components/tabs/BadgesTab';
import { CertificationsTab } from '@/components/tabs/CertificationsTab';
import { MiscTab } from '@/components/tabs/MiscTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardClientProps {
  data: BragData;
}

export function DashboardClient({ data }: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState('timeline');
  const [selectedYear, setSelectedYear] = useState<string>('all');

  // Filter achievements and code activity by year when one is selected
  const filteredData = useMemo((): BragData => {
    if (selectedYear === 'all') return data;
    return {
      ...data,
      achievements: data.achievements.filter(
        (a) => a.date && a.date.startsWith(selectedYear),
      ),
      codeActivity: data.codeActivity.filter((a) =>
        a.date.startsWith(selectedYear),
      ),
    };
  }, [data, selectedYear]);

  const tabs = [
    { id: 'timeline', label: 'Timeline', alwaysShow: true },
    { id: 'code-activity', label: 'Code Activity', alwaysShow: true },
    { id: 'skills', label: 'Skills', alwaysShow: true },
    {
      id: 'testimonials',
      label: 'Testimonials',
      alwaysShow: false,
      show: data.testimonials.length > 0,
    },
    {
      id: 'badges',
      label: 'Badges',
      alwaysShow: false,
      show: data.badges.length > 0,
    },
    {
      id: 'certifications',
      label: 'Certifications',
      alwaysShow: false,
      show: data.certifications.length > 0,
    },
    {
      id: 'misc',
      label: 'Misc',
      alwaysShow: false,
      show: data.misc.length > 0,
    },
  ].filter((t) => t.alwaysShow || t.show);

  return (
    <DataProvider initialData={data}>
      <div className="min-h-screen bg-background">
        <Header
          data={data}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
        />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <StatCarousel
            metrics={data.metrics}
            badgesCount={data.badges.length}
            certCount={data.certifications.length}
          />

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="!h-auto bg-muted p-1.5 gap-1.5 flex flex-wrap justify-start rounded-xl mb-4 sm:mb-8">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-lg px-4 py-2 text-sm font-medium transition-all text-muted-foreground hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="timeline" className="mt-0">
              <TimelineTab achievements={filteredData.achievements} />
            </TabsContent>
            <TabsContent value="code-activity" className="mt-0">
              <CodeActivityTab
                activities={
                  selectedYear === 'all'
                    ? data.codeActivity.filter((a) => a.date.startsWith('2024'))
                    : filteredData.codeActivity
                }
                year={selectedYear === 'all' ? '2024' : selectedYear}
              />
            </TabsContent>
            <TabsContent value="skills" className="mt-0">
              <SkillsTab skills={data.skills} />
            </TabsContent>
            {data.testimonials.length > 0 && (
              <TabsContent value="testimonials" className="mt-0">
                <TestimonialsTab testimonials={data.testimonials} />
              </TabsContent>
            )}
            {data.badges.length > 0 && (
              <TabsContent value="badges" className="mt-0">
                <BadgesTab badges={data.badges} />
              </TabsContent>
            )}
            {data.certifications.length > 0 && (
              <TabsContent value="certifications" className="mt-0">
                <CertificationsTab certifications={data.certifications} />
              </TabsContent>
            )}
            {data.misc.length > 0 && (
              <TabsContent value="misc" className="mt-0">
                <MiscTab misc={data.misc} />
              </TabsContent>
            )}
          </Tabs>
        </main>
      </div>
    </DataProvider>
  );
}
