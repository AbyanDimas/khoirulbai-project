'use client';
import { User, Code, Palette, Camera, FileText, TestTube2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TentangKami() {
  const teamMembers = [
    {
      id: 1,
      name: "Abyan Dimas R. Mussyafa",
      role: "Frontend Developer",
      icon: <Code className="w-5 h-5" />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
      id: 2,
      name: "M. Ali Mustofa",
      role: "Backend Developer",
      icon: <Code className="w-5 h-5" />,
      color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
      id: 3,
      name: "Arini Arsinta Aulia",
      role: "UI Designer & Dokumentasi",
      icon: <Palette className="w-5 h-5" />,
      color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
    },
    {
      id: 4,
      name: "Jihan Alisa Julianti",
      role: "Konten & Galeri",
      icon: <Camera className="w-5 h-5" />,
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
      id: 5,
      name: "Nesyah Rizka Aulia",
      role: "Testing & Dokumentasi",
      icon: <TestTube2 className="w-5 h-5" />,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Tentang Kami</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tim pengembang yang berdedikasi untuk menciptakan solusi digital berkualitas dengan semangat kolaborasi dan inovasi.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">No</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Nama Lengkap</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Peran</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {teamMembers.map((member, index) => (
                  <motion.tr
                    key={member.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {member.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {member.role}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6">
                <div className={`w-12 h-12 rounded-full ${member.color} flex items-center justify-center mb-4`}>
                  {member.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{member.role}</p>
                <div className="flex space-x-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    Anggota #{index + 1}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    Tim Inti
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Visi Kami</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Menciptakan solusi teknologi yang inovatif dan bermanfaat bagi masyarakat dengan pendekatan kolaboratif dan berorientasi pada kualitas.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Misi Kami</h2>
          <ul className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto space-y-2 text-left">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Mengembangkan produk digital yang user-friendly dan berkualitas tinggi</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Berkolaborasi secara efektif untuk mencapai tujuan bersama</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Terus belajar dan berinovasi dalam teknologi terkini</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Memberikan kontribusi positif bagi masyarakat melalui teknologi</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}