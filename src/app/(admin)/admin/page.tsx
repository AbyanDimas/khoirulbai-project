'use client'

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Line, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { 
  Users, 
  Eye, 
  Activity, 
  Clock, 
  LayoutDashboard, 
  TrendingUp,
  FileText
} from 'lucide-react';
import { format, subDays, eachDayOfInterval } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type VisitorData = {
  date: string;
  count: number;
};

type PageViewData = {
  page_path: string;
  count: number;
};

export default function Dashboard() {
  const supabase = createClientComponentClient();
  const [realtimeVisitors, setRealtimeVisitors] = useState<number>(0);
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [visitorData, setVisitorData] = useState<VisitorData[]>([]);
  const [pageViews, setPageViews] = useState<PageViewData[]>([]);
  const [timeRange, setTimeRange] = useState<string>('7days');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch visitor data
  const fetchVisitorData = async () => {
    setIsLoading(true);
    
    try {
      // Calculate date range
      let fromDate;
      const toDate = new Date();
      
      if (timeRange === '24hours') {
        fromDate = subDays(toDate, 1);
      } else if (timeRange === '7days') {
        fromDate = subDays(toDate, 7);
      } else {
        fromDate = subDays(toDate, 30);
      }

      // Fetch total visitors
      const { count: totalCount } = await supabase
        .from('website_visitors')
        .select('*', { count: 'exact', head: true });
      
      setTotalVisitors(totalCount || 0);

      // Fetch realtime visitors (last 5 minutes)
      const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
      const { count: realtimeCount } = await supabase
        .from('website_visitors')
        .select('*', { count: 'exact', head: true })
        .gt('created_at', fiveMinutesAgo);
      
      setRealtimeVisitors(realtimeCount || 0);

      // Fetch visitor trends
      const dateRange = eachDayOfInterval({ start: fromDate, end: toDate });
      const dateStrings = dateRange.map(date => format(date, 'yyyy-MM-dd'));

      const { data: visitorTrends } = await supabase
        .from('website_visitors')
        .select('created_at')
        .gte('created_at', fromDate.toISOString());

      // Group by date
      const countsByDate: Record<string, number> = {};
      dateStrings.forEach(date => {
        countsByDate[date] = 0;
      });

      visitorTrends?.forEach(visit => {
        const visitDate = format(new Date(visit.created_at), 'yyyy-MM-dd');
        if (countsByDate.hasOwnProperty(visitDate)) {
          countsByDate[visitDate]++;
        }
      });

      const formattedData = dateStrings.map(date => ({
        date,
        count: countsByDate[date]
      }));

      setVisitorData(formattedData);

      // Fetch popular pages
      const { data: popularPages } = await supabase
        .from('website_visitors')
        .select('page_path')
        .gte('created_at', fromDate.toISOString());

      const pageCounts: Record<string, number> = {};
      popularPages?.forEach(visit => {
        const path = visit.page_path || 'Unknown';
        pageCounts[path] = (pageCounts[path] || 0) + 1;
      });

      const sortedPages = Object.entries(pageCounts)
        .map(([page_path, count]) => ({ page_path, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      setPageViews(sortedPages);

    } catch (error) {
      console.error('Error fetching visitor data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('realtime visitors')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'website_visitors' },
        () => {
          fetchVisitorData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Initial fetch and refetch when time range changes
  useEffect(() => {
    fetchVisitorData();
  }, [timeRange]);

  // Chart data for visitor trends
  const visitorTrendsChartData = {
    labels: visitorData.map(item => format(new Date(item.date), 'MMM dd')),
    datasets: [
      {
        label: 'Pengunjung',
        data: visitorData.map(item => item.count),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Chart data for popular pages
  const popularPagesChartData = {
    labels: pageViews.map(item => item.page_path),
    datasets: [
      {
        label: 'Kunjungan Halaman',
        data: pageViews.map(item => item.count),
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" /> Dashboard Analisis Pengunjung
        </h1>
        <p className="text-gray-600">Statistik pengunjung website secara realtime</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pengunjung Realtime</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{realtimeVisitors}</p>
                </div>
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                  <Activity className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Dalam 5 menit terakhir
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Pengunjung</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">{totalVisitors}</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <Users className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Seluruh waktu
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Kunjungan Hari Ini</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {visitorData[visitorData.length - 1]?.count || 0}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <Eye className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {format(new Date(), 'dd MMM yyyy')}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Halaman Populer</p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {pageViews[0]?.page_path || '-'}
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FileText className="w-6 h-6" />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {pageViews[0]?.count || 0} kunjungan
              </p>
            </div>
          </div>

          {/* Time Range Selector */}
          <div className="mb-6 flex justify-end">
            <div className="inline-flex rounded-md shadow-sm">
              <button
                onClick={() => setTimeRange('24hours')}
                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                  timeRange === '24hours'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                24 Jam
              </button>
              <button
                onClick={() => setTimeRange('7days')}
                className={`px-4 py-2 text-sm font-medium ${
                  timeRange === '7days'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                7 Hari
              </button>
              <button
                onClick={() => setTimeRange('30days')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  timeRange === '30days'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                30 Hari
              </button>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" /> Tren Pengunjung
                </h2>
              </div>
              <div className="h-80">
                <Line 
                  data={visitorTrendsChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                  }} 
                />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <FileText className="w-5 h-5" /> Halaman Terpopuler
                </h2>
              </div>
              <div className="h-80">
                <Bar 
                  data={popularPagesChartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Recent Visitors Table */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Halaman Terpopuler</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Halaman
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Jumlah Kunjungan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Persentase
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pageViews.map((page, index) => {
                    const percentage = totalVisitors > 0 
                      ? ((page.count / totalVisitors) * 100).toFixed(1) 
                      : '0.0';
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {page.page_path}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {page.count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                              <div 
                                className="bg-indigo-600 h-2.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            {percentage}%
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}