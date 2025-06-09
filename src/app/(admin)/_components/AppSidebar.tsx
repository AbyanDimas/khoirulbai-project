"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  ChevronDown,
  Menu,
  X,
  Settings,
  Eye,
  ArrowBigLeft,
  PanelLeftClose,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (!isMobile) setIsOpen(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [isMobile]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },
    {
      name: "Pengunjung",
      icon: <Eye size={20} />,
      subItems: [
        { name: "Jumlah Pengunjung", path: "/forms/elements" },
        { name: "Akun Pengunjung", path: "/forms/layouts" },
      ],
    },
  ];

  const otherItems = [
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      subItems: [
        { name: "Login", path: "/auth/login" },
        { name: "Register", path: "/auth/register" },
      ],
    },
  ];

  const sidebarVariants = {
    open: { width: "260px", opacity: 1 },
    closed: { width: "80px", opacity: 1 },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -20 },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed z-50 p-2 m-2 rounded-lg md:hidden bg-gray-100 dark:bg-gray-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <motion.div
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm z-40 overflow-hidden"
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-center p-4 mb-8">
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { scale: 1 },
                closed: { scale: 0.8 },
              }}
            >
              {isOpen ? (
                <span className="text-xl font-bold dark:text-white">
                  Admin Dashboard
                </span>
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-500" />
              )}
            </motion.div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="mb-8">
              <motion.p
                className="text-xs font-semibold text-gray-500 uppercase mb-4"
                animate={isOpen ? "open" : "closed"}
                variants={itemVariants}
              >
                {isOpen ? "Menu" : "..."}
              </motion.p>

              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.path ? (
                      <Link href={item.path}>
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center p-3 rounded-lg transition-colors ${
                            activeSubmenu === item.name
                              ? "bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <AnimatePresence>
                            {isOpen && (
                              <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="ml-3 text-sm font-medium"
                              >
                                {item.name}
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      </Link>
                    ) : (
                      <>
                        <motion.button
                          onClick={() => toggleSubmenu(item.name)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                            activeSubmenu === item.name
                              ? "bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400"
                              : "hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                        >
                          <span className="flex-shrink-0">{item.icon}</span>
                          <AnimatePresence>
                            {isOpen && (
                              <>
                                <motion.span
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  className="ml-3 text-sm font-medium"
                                >
                                  {item.name}
                                </motion.span>
                                <motion.span
                                  className="ml-auto"
                                  animate={{
                                    rotate:
                                      activeSubmenu === item.name ? 180 : 0,
                                  }}
                                >
                                  <ChevronDown size={16} />
                                </motion.span>
                              </>
                            )}
                          </AnimatePresence>
                        </motion.button>

                        <AnimatePresence>
                          {activeSubmenu === item.name && isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <ul className="pl-4 mt-1 space-y-1">
                                {item.subItems?.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link href={subItem.path}>
                                      <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                      >
                                        <span className="ml-2">
                                          {subItem.name}
                                        </span>
                                      </motion.div>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Other Items Section */}
            <div className="mb-8">
              <motion.p
                className="text-xs font-semibold text-gray-500 uppercase mb-4"
                animate={isOpen ? "open" : "closed"}
                variants={itemVariants}
              >
                {isOpen ? "Others" : "..."}
              </motion.p>

              <ul className="space-y-1">
                {otherItems.map((item) => (
                  <li key={item.name}>
                    <motion.button
                      onClick={() => toggleSubmenu(item.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center w-full p-3 rounded-lg transition-colors ${
                        activeSubmenu === item.name
                          ? "bg-brand-100 dark:bg-brand-900 text-brand-600 dark:text-brand-400"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      <span className="flex-shrink-0">{item.icon}</span>
                      <AnimatePresence>
                        {isOpen && (
                          <>
                            <motion.span
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="ml-3 text-sm font-medium"
                            >
                              {item.name}
                            </motion.span>
                            <motion.span
                              className="ml-auto"
                              animate={{
                                rotate: activeSubmenu === item.name ? 180 : 0,
                              }}
                            >
                              <ChevronDown size={16} />
                            </motion.span>
                          </>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <AnimatePresence>
                      {activeSubmenu === item.name && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <ul className="pl-4 mt-1 space-y-1">
                            {item.subItems?.map((subItem) => (
                              <li key={subItem.name}>
                                <Link href={subItem.path}>
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                  >
                                    <span className="ml-2">{subItem.name}</span>
                                  </motion.div>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* User Profile (Optional) */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 mt-auto border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                <div className="ml-3">
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Admin
                  </p>
                </div>
              </div>
            </motion.div>
          )}
<div className="flex items-center justify-between mt-4">
  {/* Tombol Kembali */}
  <button className="flex items-center gap-1 px-4 py-2 text-sm bg-gray-700 text-gray-200 hover:text-black dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors duration-200">
    <ArrowBigLeft className="w-4 h-4" />
    Kembali
  </button>

  {/* Tombol Toggle Sidebar */}
  <button
    className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
  >
    <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
  </button>
</div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
