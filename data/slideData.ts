// =============================================================================
// LEARNAPART WRAPPED 2025 - SLIDE DATA
// =============================================================================
// This file contains all the data and configuration used across the presentation slides.
// Update values here to reflect across all slides.

// =============================================================================
// SLIDE 3: MAP - Cities Data
// =============================================================================
export const MAP_CITIES = [
    { name: "Hyderabad", x: 45, y: 60, pulse: 1.5 },
    { name: "Bangalore", x: 42, y: 75, pulse: 1.5 },
    { name: "Chennai", x: 52, y: 78, pulse: 2.2 },
    { name: "Vizag", x: 55, y: 58, pulse: 2.2 },
    { name: "Delhi", x: 40, y: 25, pulse: 3.0, highlight: true },
    { name: "Noida", x: 42, y: 24, pulse: 3.0, highlight: true },
    { name: "Mumbai", x: 25, y: 55, pulse: 3.0 },
    { name: "Pune", x: 28, y: 58, pulse: 3.0 },
    { name: "Warangal", x: 48, y: 58, pulse: 3.0 },
    { name: "Vijayawada", x: 50, y: 62, pulse: 3.0 },
    { name: "Kashmir", x: 35, y: 10, pulse: 0, label: "many more", type: "ghost" },
];

// =============================================================================
// SLIDE 4: GENRES - Workshop Categories
// =============================================================================
export const GENRES = [
    {
        id: 'ai-agents',
        title: 'AI Agents',
        subtitle: 'The Future of Automation',
        workshopCount: 14,
        icon: '🤖',
        description: 'Building autonomous systems that think, decide, and act',
        color: {
            primary: '#8B5CF6',
            secondary: '#A78BFA',
            glow: 'rgba(139, 92, 246, 0.4)',
        },
        highlights: ['LangChain', 'AutoGPT', 'Multi-Agent Systems', 'Tool Calling'],
        isHero: true,
    },
    {
        id: 'fullstack',
        title: 'Full Stack Web',
        subtitle: 'Core Engineering',
        workshopCount: 3,
        icon: '🌐',
        description: 'End-to-end web development with modern frameworks',
        color: {
            primary: '#3B82F6',
            secondary: '#60A5FA',
            glow: 'rgba(59, 130, 246, 0.4)',
        },
        highlights: ['React', 'Next.js', 'Node.js', 'APIs'],
    },
    {
        id: 'nocode',
        title: 'No-Code',
        subtitle: 'Velocity Track',
        workshopCount: 2,
        icon: '⚡',
        description: 'Ship products without writing a single line of code',
        color: {
            primary: '#10B981',
            secondary: '#34D399',
            glow: 'rgba(16, 185, 129, 0.4)',
        },
        highlights: ['Bubble', 'Webflow', 'Zapier', 'Make'],
    },
    {
        id: 'python',
        title: 'Python for AI',
        subtitle: 'Foundation',
        workshopCount: 2,
        icon: '🐍',
        description: 'Master Python for machine learning and data science',
        color: {
            primary: '#F59E0B',
            secondary: '#FBBF24',
            glow: 'rgba(245, 158, 11, 0.4)',
        },
        highlights: ['NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow'],
    },
    {
        id: 'startup',
        title: 'Startup Engineering',
        subtitle: 'Strategy',
        workshopCount: 1,
        icon: '🚀',
        description: 'Build and scale startups from zero to one',
        color: {
            primary: '#EF4444',
            secondary: '#F87171',
            glow: 'rgba(239, 68, 68, 0.4)',
        },
        highlights: ['MVP', 'Product-Market Fit', 'Growth', 'Fundraising'],
    },
];

// =============================================================================
// SLIDE 5: TOP HIT - Agentsphere Series
// =============================================================================
export const AGENTSPHERE_DATA = {
    title: 'Agentsphere',
    tagline: 'Teaching builders to automate from first principles—not prompts.',
    stats: [
        { value: 5, label: 'tier-2 colleges', suffix: 'The real India.' },
        { value: 2200, label: 'builders', suffix: 'Zero dropouts.' },
        { value: 3000, label: 'agents', suffix: 'In production.' },
    ],
    series: 'Series 01',
};

// =============================================================================
// SLIDE 6: PROJECTS - Project Flood Stats
// =============================================================================
export const PROJECTS_DATA = {
    totalProjects: 1340,
    projectTypes: [
        'AI Chatbot',
        'Data Pipeline',
        'Web Scraper',
        'ML Model',
        'Automation Bot',
        'API Integration',
        'Dashboard',
        'Voice Assistant',
        'Recommendation Engine',
        'Content Generator',
    ],
    tagline: 'Projects Shipped',
};

// =============================================================================
// SLIDE 8: FANDOM - Feedback & Ratings
// =============================================================================
export const FANDOM_DATA = {
    rating: 4.7,
    maxRating: 5,
    repeatInviteRate: 63,
    totalResponses: 847,
    praiseWords: [
        'Incredible',
        'Mind-blowing',
        'Transformative',
        'Game-changer',
        'Revolutionary',
        'Essential',
        'Brilliant',
        'Outstanding',
        'Exceptional',
        'Powerful',
        'Inspiring',
        'Next-level',
    ],
    tagline: 'Workshops that institutions can\'t stop talking about.',
};

// =============================================================================
// SLIDE 9: FUTURE - Growth Projections
// =============================================================================
export const GROWTH_DATA = {
    current2025: {
        builders: 4860,
        projects: 1340,
        clubs: 15,
        cities: 11,
        workshops: 22,
    },
    target2026: {
        builders: 20000,
        projects: 5000,
        clubs: 1000,
        cities: 40,
        workshops: 80,
    },
    growthMultiplier: '4x',
    strategicPillars: [
        {
            id: 'verticals',
            title: 'Building Verticals',
            description: 'AI Agents, Full Stack, No-Code, Python',
            icon: '🏗️',
            status: 'active',
        },
        {
            id: 'community',
            title: 'Community Leverage',
            description: 'Student-led growth engine',
            icon: '👥',
            status: 'active',
        },
        {
            id: 'clubs',
            title: '1000+ Club Network',
            description: 'Campus partnerships at scale',
            icon: '🎯',
            status: 'target',
        },
    ],
    product: {
        name: 'Project Vishwakarma',
        tagline: 'One platform. Every campus. All builders.',
        label: 'Single Product Agenda',
    },
    tractionSignals: [
        { label: 'Active Pilots', value: '8+', sublabel: 'Running' },
        { label: 'Club Inquiries', value: '50+', sublabel: 'Pipeline' },
        { label: 'Repeat Rate', value: '63%', sublabel: 'Retention' },
    ],
};

// =============================================================================
// SLIDE 10: SUMMARY - Final Stats
// =============================================================================
export const SUMMARY_DATA = {
    brand: 'LearnApart',
    year: '2025',
    stats: [
        { value: '4,860+', label: 'BUILDERS' },
        { value: '1,340+', label: 'PROJECTS' },
        { value: '22', label: 'WORKSHOPS' },
        { value: '11', label: 'CITIES' },
    ],
    statement: {
        line1: 'From classrooms to production.',
        line2: 'From ideas to impact.',
    },
    tagline: 'Learning that ships.',
};

// =============================================================================
// GLOBAL THEME
// =============================================================================
export const THEME = {
    colors: {
        primary: '#4a7aff',
        accent: '#00ff9d',
        warning: '#FFD700',
        background: '#0a0a0a',
        surface: '#1a1a1a',
        text: {
            primary: '#ffffff',
            secondary: 'rgba(255,255,255,0.6)',
            muted: 'rgba(255,255,255,0.4)',
            subtle: 'rgba(255,255,255,0.2)',
        },
    },
    fonts: {
        display: 'var(--font-playfair)',
        body: 'var(--font-inter)',
    },
};

// =============================================================================
// TOTALS (Calculated)
// =============================================================================
export const TOTALS = {
    workshopsDelivered: GENRES.reduce((sum, g) => sum + g.workshopCount, 0), // 22
    citiesReached: MAP_CITIES.filter(c => c.type !== 'ghost').length, // 10+
    genresOffered: GENRES.length, // 5
};
