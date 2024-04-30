import React from 'react';
import Navbar from './_components/navbar';

type LandingLayoutProps = {
  children: React.ReactNode;
};

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
