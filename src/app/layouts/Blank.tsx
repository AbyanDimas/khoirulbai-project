'use client' // Important for Framer Motion to work in Next.js 13+

import { motion } from 'framer-motion';
import { LayoutTemplate, Plus, File, FilePlus, FileText } from 'lucide-react';
import Head from 'next/head';

const BlankPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <>
            <Head>
                <title>Blank Template</title>
                <meta name="description" content="A customizable blank page template" />
            </Head>
            
            <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <motion.div 
                    className="flex-1 flex flex-col items-center justify-center p-6"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Main Icon */}
                    <motion.div
                        variants={itemVariants}
                        className="mb-6 p-5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <LayoutTemplate className="w-12 h-12" strokeWidth={1.5} />
                    </motion.div>

                    {/* Title */}
                    <motion.h1 
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4 text-center"
                    >
                        Blank Template
                    </motion.h1>

                    {/* Description */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-gray-600 dark:text-gray-300 text-center max-w-md mb-8"
                    >
                        Start building your page from this clean template
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div 
                        className="flex flex-wrap justify-center gap-4"
                        variants={containerVariants}
                    >
                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-6 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New
                        </motion.button>

                        <motion.button
                            variants={itemVariants}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center px-6 py-3 rounded-lg border border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
                        >
                            <FilePlus className="w-5 h-5 mr-2" />
                            Add Content
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </>
    );
};

export default BlankPage;