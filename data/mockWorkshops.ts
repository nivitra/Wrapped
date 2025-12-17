export interface Workshop {
    id: string;
    title: string;
    category: string;
    date: string;
    location: string;
    image: string;
    instructor: string;
    spots: number;
    price: string;
}

export const MOCK_WORKSHOPS: Workshop[] = [
    {
        id: "1",
        title: "AI Automation in a Day",
        category: "AI & Automation",
        date: "March 15, 2025",
        location: "Hyderabad, T-Hub",
        image: "bg-gradient-to-br from-purple-600 to-blue-600",
        instructor: "Nivi",
        spots: 12,
        price: "$49"
    },
    {
        id: "2",
        title: "Building Agents with LLMs",
        category: "Agentic AI",
        date: "March 22, 2025",
        location: "Bangalore, WeWork",
        image: "bg-gradient-to-br from-emerald-500 to-teal-700",
        instructor: "Sarah Chen",
        spots: 8,
        price: "$199"
    },
    {
        id: "3",
        title: "Next.js 15 & React Server Components",
        category: "Web Development",
        date: "April 05, 2025",
        location: "Mumbai, 91Springboard",
        image: "bg-gradient-to-br from-orange-500 to-red-600",
        instructor: "Alex Rivera",
        spots: 20,
        price: "$149"
    },
    {
        id: "4",
        title: "No-Code SaaS Building",
        category: "No-Code",
        date: "April 12, 2025",
        location: "Online / Zoom",
        image: "bg-gradient-to-br from-pink-500 to-rose-500",
        instructor: "Mike Ross",
        spots: 50,
        price: "$99"
    },
    {
        id: "5",
        title: "Python for Data Science",
        category: "Data Science",
        date: "April 20, 2025",
        location: "Chennai, IIT Park",
        image: "bg-gradient-to-br from-blue-500 to-indigo-600",
        instructor: "Priya Sharma",
        spots: 15,
        price: "$129"
    },
    {
        id: "6",
        title: "Generative Art with Code",
        category: "Creative Coding",
        date: "May 01, 2025",
        location: "Delhi, Hauz Khas",
        image: "bg-gradient-to-br from-yellow-400 to-orange-500",
        instructor: "David Kim",
        spots: 10,
        price: "$89"
    }
];
