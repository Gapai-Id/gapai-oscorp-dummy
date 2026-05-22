'use client';

import { useState } from 'react';
import { DashboardShell } from '@/components/layout/DashboardShell';
import CandidatesOverviewScreen from '@/components/screens/CandidatesOverviewScreen';
import CandidatesListScreen from '@/components/screens/CandidatesListScreen';
import CandidatesDetailScreen from '@/components/screens/CandidatesDetailScreen';
import CandidatesKanbanScreen from '@/components/screens/CandidatesKanbanScreen';
import ScreeningListScreen from '@/components/screens/ScreeningListScreen';
import JobsListScreen from '@/components/screens/JobsListScreen';
import JobsCreateScreen from '@/components/screens/JobsCreateScreen';
import StagesListScreen from '@/components/screens/StagesListScreen';
import StagesCreateScreen from '@/components/screens/StagesCreateScreen';
import StagesEditScreen from '@/components/screens/StagesEditScreen';
import JakersListScreen from '@/components/screens/JakersListScreen';
import JakersDetailScreen from '@/components/screens/JakersDetailScreen';
import JakersCreateScreen from '@/components/screens/JakersCreateScreen';
import JakersCreateLanguageScreen from '@/components/screens/JakersCreateLanguageScreen';
import JakersCreateSkillsScreen from '@/components/screens/JakersCreateSkillsScreen';
import JakersCreatePlacementScreen from '@/components/screens/JakersCreatePlacementScreen';
import JakersEditScreen from '@/components/screens/JakersEditScreen';
import LoginScreen from '@/components/screens/LoginScreen';

const SCREENS = [
  { id: 'CM-01', name: 'Candidates — Overview: Funnel (CM-01)', nav: 'candidates', component: CandidatesOverviewScreen },
  { id: 'CM-02', name: 'Candidates — List: Candidates Tab (CM-02)', nav: 'candidates', component: CandidatesListScreen },
  { id: 'CM-03', name: 'Candidates — Detail (CM-03)', nav: 'candidates', component: CandidatesDetailScreen },
  { id: 'CM-04', name: 'Candidates — Kanban: Alt Layout (CM-04)', nav: 'candidates', component: CandidatesKanbanScreen },
  { id: 'SC-01', name: 'Screening — List (SC-01)', nav: 'screening', component: ScreeningListScreen },
  { id: 'JB-01', name: 'Jobs — List (JB-01)', nav: 'jobs', component: JobsListScreen },
  { id: 'JB-02', name: 'Jobs — Create (JB-02)', nav: 'jobs', component: JobsCreateScreen },
  { id: 'ST-01', name: 'Stages — List (ST-01)', nav: 'stages', component: StagesListScreen },
  { id: 'ST-02', name: 'Stages — Create (ST-02)', nav: 'stages', component: StagesCreateScreen },
  { id: 'ST-03', name: 'Stages — Edit (ST-03)', nav: 'stages', component: StagesEditScreen },
  { id: 'JK-01', name: 'Jakers — List (JK-01)', nav: 'jakers', component: JakersListScreen },
  { id: 'JK-02', name: 'Jakers — Detail (JK-02)', nav: 'jakers', component: JakersDetailScreen },
  { id: 'JK-03', name: 'Jakers — Create: Candidate Basic (JK-03)', nav: 'jakers', component: JakersCreateScreen },
  { id: 'JK-03b', name: 'Jakers — Create: Language (JK-03b)', nav: 'jakers', component: JakersCreateLanguageScreen },
  { id: 'JK-03c', name: 'Jakers — Create: Skills (JK-03c)', nav: 'jakers', component: JakersCreateSkillsScreen },
  { id: 'JK-03d', name: 'Jakers — Create: Placement (JK-03d)', nav: 'jakers', component: JakersCreatePlacementScreen },
  { id: 'JK-04', name: 'Jakers — Edit (JK-04)', nav: 'jakers', component: JakersEditScreen },
  { id: 'L-01', name: 'Login (L-01)', nav: null, component: LoginScreen },
];

export default function InventoryPage() {
  const [currentId, setCurrentId] = useState('CM-01');

  const current = SCREENS.find(s => s.id === currentId) ?? SCREENS[0];
  const ActiveScreen = current.component;

  return (
    <div className="min-h-screen pb-14">
      {current.nav ? (
        <DashboardShell
          activeNav={current.nav}
          onNavChange={(nav) => {
            const first = SCREENS.find(s => s.nav === nav);
            if (first) setCurrentId(first.id);
          }}
        >
          <ActiveScreen />
        </DashboardShell>
      ) : (
        <ActiveScreen />
      )}

      {/* Screen Navigator — sticky bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="mx-auto px-4 py-2 flex items-center gap-2 max-w-screen-xl">
          <p className="text-[10px] text-gray-400 whitespace-nowrap">Screen Navigator</p>
          <select
            value={currentId}
            onChange={(e) => setCurrentId(e.target.value)}
            className="flex-1 px-2 py-1.5 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {SCREENS.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
