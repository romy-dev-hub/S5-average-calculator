'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Linkedin, Mail, Sparkles } from 'lucide-react';
import Image from 'next/image';

interface AboutCreatorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutCreatorModal({ isOpen, onClose }: AboutCreatorModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            {/* Cover Image */}
                            <div className="relative h-40 sm:h-48 overflow-hidden">
                                <Image
                                    src="/cover.gif"
                                    alt="Cover"
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-3 right-3 p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full transition-colors"
                                >
                                    <X size={20} className="text-white" />
                                </button>
                            </div>

                            {/* Profile Image */}
                            <div className="relative flex justify-center -mt-16">
                                <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                    <Image
                                        src="/me.jpg"
                                        alt="Creator"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 pt-4 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Sparkles className="text-yellow-500" size={20} />
                                    <h2 className="text-2xl font-bold text-gray-800">小罗</h2>
                                    <Sparkles className="text-yellow-500" size={20} />
                                </div>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Hey there! 👋 I'm 小罗, a passionate Computer Science student at USTHB,
                                    currently navigating the exciting world of S5. I built this calculator
                                    because I believe that tracking your academic progress should be
                                    <span className="font-semibold text-blue-600"> beautiful</span>,
                                    <span className="font-semibold text-purple-600"> intuitive</span>, and
                                    <span className="font-semibold text-green-600"> stress-free</span>.
                                </p>

                                <p className="text-gray-600 leading-relaxed mb-6">
                                    When I'm not coding, you'll find me exploring new technologies,
                                    contributing to open source, or helping fellow students succeed.
                                    This project is crafted with ❤️ to make your academic journey a little easier!
                                </p>

                                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-4">
                                    <span>Built with</span>
                                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Next.js</span>
                                    <span>+</span>
                                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Tailwind</span>
                                    <span>+</span>
                                    <span className="font-mono bg-gray-100 px-2 py-0.5 rounded">Framer Motion</span>
                                </div>

                                <button
                                    onClick={onClose}
                                    className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    Back to Calculator
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
