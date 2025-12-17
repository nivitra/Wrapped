"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, User, ArrowUpRight } from "lucide-react";
import { MOCK_WORKSHOPS } from "@/data/mockWorkshops";

export default function WorkshopsSection() {
    return (
        <section className="py-24 px-6 bg-zinc-950 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-white">
                            Upcoming Workshops
                        </h2>
                        <p className="text-zinc-400 max-w-xl text-lg">
                            Join our immersive, hands-on sessions designed to take you from zero to hero in record time.
                        </p>
                    </div>
                    <button className="px-6 py-3 rounded-full border border-white/10 text-white hover:bg-white/5 transition-colors flex items-center gap-2">
                        View Full Schedule <ArrowUpRight size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_WORKSHOPS.map((workshop, i) => (
                        <motion.div
                            key={workshop.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Image Placeholder */}
                            <div className={`h-48 w-full ${workshop.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-bold border border-white/10">
                                    {workshop.category}
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl font-bold text-white leading-tight group-hover:text-neon-blue transition-colors">
                                        {workshop.title}
                                    </h3>
                                    <span className="text-white font-bold bg-white/10 px-2 py-1 rounded text-sm">
                                        {workshop.price}
                                    </span>
                                </div>

                                <div className="space-y-3 text-sm text-zinc-400 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={16} className="text-zinc-500" />
                                        {workshop.date}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={16} className="text-zinc-500" />
                                        {workshop.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <User size={16} className="text-zinc-500" />
                                        {workshop.instructor}
                                    </div>
                                </div>

                                <button className="w-full py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
                                    Register Now
                                    <span className="text-xs font-normal text-zinc-600">({workshop.spots} spots left)</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
