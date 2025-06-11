"use client";
import { useState, useEffect, useRef } from "react";
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
  PanelLeftOpen,
  User,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen && sidebarRef.current && 
          !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile, isOpen]);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSidebar = () => setIsOpen(!isOpen);
  
  const toggleSubmenu = (menu: string) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const closeSidebar = () => {
    if (isMobile) setIsOpen(false);
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
        { name: "Jumlah Pengunjung", path: "/admin/jumlah-pengunjung" },
        { name: "Akun Pengunjung", path: "/admin/akun-pengunjung" },
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
    closed: { width: isMobile ? "0px" : "80px", opacity: 1 },
  };

  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: isMobile ? 0 : 1, x: isMobile ? -20 : 0 },
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`fixed z-50 p-2 m-2 rounded-lg md:hidden bg-white dark:bg-gray-800 shadow-md transition-all ${
          isOpen ? "ml-[240px]" : "ml-2"
        }`}
        aria-label="Toggle sidebar"
      >
        {isOpen ? (
          <X size={24} className="text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu size={24} className="text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Sidebar Backdrop for Mobile */}
      {isMobile && isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-30 bg-black"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.div
        ref={sidebarRef}
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        className="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm z-40 overflow-hidden"
        onHoverStart={() => !isMobile && setIsHovering(true)}
        onHoverEnd={() => !isMobile && setIsHovering(false)}
      >
        <div className="flex flex-col h-full p-4">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 mb-4">
            <motion.div
              animate={isOpen ? "open" : "closed"}
              variants={{
                open: { scale: 1 },
                closed: { scale: 0.8 },
              }}
              className="flex items-center"
            >
              {isOpen ? (
                <span className="text-xl font-bold dark:text-white whitespace-nowrap">
                  Admin Dashboard
                </span>
              ) : (
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AD</span>
                </div>
              )}
            </motion.div>

            {/* Desktop Toggle Button (only visible when hovered on closed sidebar) */}
            {!isMobile && !isOpen && isHovering && (
              <motion.button
                onClick={toggleSidebar}
                className="p-1 rounded-full bg-gray-100 dark:bg-gray-800"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PanelLeftOpen size={16} />
              </motion.button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto">
            <div className="mb-6">
              <motion.p
                className="text-xs font-semibold text-gray-500 uppercase mb-3 px-3"
                animate={isOpen ? "open" : "closed"}
                variants={itemVariants}
              >
                {isOpen ? "Menu" : "•"}
              </motion.p>

              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.path ? (
                      <Link href={item.path} onClick={closeSidebar}>
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
                                className="ml-3 text-sm font-medium whitespace-nowrap"
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
                                  className="ml-3 text-sm font-medium whitespace-nowrap"
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
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <ul className="pl-4 mt-1 space-y-1">
                                {item.subItems?.map((subItem) => (
                                  <li key={subItem.name}>
                                    <Link href={subItem.path} onClick={closeSidebar}>
                                      <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex items-center p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                      >
                                        <span className="ml-2 whitespace-nowrap">
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
            <div className="mb-6">
              <motion.p
                className="text-xs font-semibold text-gray-500 uppercase mb-3 px-3"
                animate={isOpen ? "open" : "closed"}
                variants={itemVariants}
              >
                {isOpen ? "Others" : "•"}
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
                              className="ml-3 text-sm font-medium whitespace-nowrap"
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <ul className="pl-4 mt-1 space-y-1">
                            {item.subItems?.map((subItem) => (
                              <li key={subItem.name}>
                                <Link href={subItem.path} onClick={closeSidebar}>
                                  <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                                  >
                                    <span className="ml-2 whitespace-nowrap">
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
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* User Profile */}
          <motion.div
            className={`p-3 mt-auto rounded-lg ${
              isOpen ? "bg-gray-50 dark:bg-gray-800" : ""
            }`}
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                <User size={18} className="text-white" />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 overflow-hidden"
                  >
                    <p className="text-sm font-medium whitespace-nowrap">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      Admin
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
              >
                <button className="flex items-center w-full p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <Settings size={16} className="mr-2" />
                  Settings
                </button>
                <button className="flex items-center w-full p-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <LogOut size={16} className="mr-2" />
                  Logout
                </button>
              </motion.div>
            )}
          </motion.div>

          {/* Bottom Buttons */}
          <div className="flex items-center justify-between mt-4">
            {/* Back Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`flex items-center gap-1 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors ${
                !isOpen ? "px-2" : ""
              }`}
            >
              <ArrowBigLeft className="w-4 h-4" />
              {isOpen && <span className="whitespace-nowrap">Kembali</span>}
            </motion.button>

            {/* Toggle Sidebar Button (desktop) */}
            {!isMobile && isOpen && (
              <motion.button
                onClick={toggleSidebar}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Collapse sidebar"
              >
                <PanelLeftClose className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;