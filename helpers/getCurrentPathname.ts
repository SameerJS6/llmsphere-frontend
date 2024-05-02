'use client';
import { usePathname } from 'next/navigation';

const GetCurrentPathname = () => {
  const pathname = usePathname();
  return pathname;
};

export default GetCurrentPathname;
