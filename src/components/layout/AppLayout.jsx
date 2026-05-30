import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomTabBar from './BottomTabBar';
import DesktopSidebar from './DesktopSidebar';

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <DesktopSidebar />
      <main className="pt-14 pb-20 md:pt-0 md:pb-0 md:pl-64">
        <div className="max-w-5xl mx-auto">
          <Outlet />
        </div>
      </main>
      <BottomTabBar />
    </div>
  );
}