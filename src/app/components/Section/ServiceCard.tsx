import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Service } from '@/app/types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

export const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow group h-full flex flex-col">
      <Link href={service.link} className="block flex-1 flex flex-col">
        <div className="bg-emerald-100 dark:bg-emerald-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900/30 transition-colors">
          {service.icon}
        </div>
        <h3 className="text-lg font-bold mb-2 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 flex-1">
          {service.description}
        </p>
        <div className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 flex items-center">
          Selengkapnya <ChevronRight className="ml-1 h-4 w-4" />
        </div>
      </Link>
    </div>
  );
};