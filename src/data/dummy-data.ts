export interface Issue {
    id: string;
    title: string;
    description: string;
    category: 'garbage' | 'road' | 'water' | 'electricity' | 'safety' | 'other';
    status: 'reported' | 'verified' | 'assigned' | 'resolved';
    location: {
        name: string;
        lat: number;
        lng: number;
    };
    image: string;
    authorityId: string;
    supportCount: number;
    commentCount: number;
    reportedBy: string;
    reportedAt: string;
    timeline: TimelineEvent[];
    comments: Comment[];
}

export interface TimelineEvent {
    status: string;
    date: string;
    description: string;
    completed: boolean;
}

export interface Comment {
    id: string;
    author: string;
    initials: string;
    text: string;
    time: string;
}

export interface Authority {
    id: string;
    name: string;
    department: string;
    initials: string;
    totalIssues: number;
    resolvedIssues: number;
    avgResolutionDays: number;
}

export interface UserProfile {
    name: string;
    initials: string;
    joinedDate: string;
    reportsPosted: number;
    issuesSupported: number;
    contributions: number;
    badges: { name: string; color: string; bgColor: string; icon: string }[];
}

// --- Authorities ---
export const authorities: Authority[] = [
    {
        id: 'auth-1',
        name: 'Municipal Corporation',
        department: 'Waste Management Division',
        initials: 'MC',
        totalIssues: 342,
        resolvedIssues: 289,
        avgResolutionDays: 4.2,
    },
    {
        id: 'auth-2',
        name: 'Public Works Dept.',
        department: 'Roads & Infrastructure',
        initials: 'PW',
        totalIssues: 198,
        resolvedIssues: 156,
        avgResolutionDays: 7.8,
    },
    {
        id: 'auth-3',
        name: 'Water Supply Board',
        department: 'Water Infrastructure',
        initials: 'WS',
        totalIssues: 127,
        resolvedIssues: 98,
        avgResolutionDays: 3.5,
    },
    {
        id: 'auth-4',
        name: 'Electricity Board',
        department: 'Power Distribution',
        initials: 'EB',
        totalIssues: 215,
        resolvedIssues: 190,
        avgResolutionDays: 2.1,
    },
    {
        id: 'auth-5',
        name: 'Police Department',
        department: 'Public Safety Division',
        initials: 'PD',
        totalIssues: 89,
        resolvedIssues: 72,
        avgResolutionDays: 1.8,
    },
    {
        id: 'auth-6',
        name: 'City Planning Office',
        department: 'Urban Development',
        initials: 'CP',
        totalIssues: 64,
        resolvedIssues: 41,
        avgResolutionDays: 14.5,
    },
];

// --- Issues ---
export const issues: Issue[] = [
    {
        id: 'issue-1',
        title: 'Overflowing garbage bin near Central Park entrance',
        description: 'The garbage bin at the main entrance of Central Park has been overflowing for the past 3 days. Waste is spreading onto the walkway and causing a foul smell. Multiple bins in this area need urgent replacement with larger containers.',
        category: 'garbage',
        status: 'assigned',
        location: { name: 'Central Park, Main Gate', lat: 28.6139, lng: 77.2090 },
        image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop',
        authorityId: 'auth-1',
        supportCount: 47,
        commentCount: 12,
        reportedBy: 'Rahul M.',
        reportedAt: '2 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 27, 2026 · 9:15 AM', description: 'Issue reported by Rahul M.', completed: true },
            { status: 'Verified', date: 'Feb 27, 2026 · 2:30 PM', description: 'Verified by community moderator', completed: true },
            { status: 'Assigned', date: 'Feb 28, 2026 · 10:00 AM', description: 'Assigned to Municipal Corporation', completed: true },
            { status: 'Resolved', date: 'Pending', description: 'Awaiting resolution', completed: false },
        ],
        comments: [
            { id: 'c1', author: 'Priya S.', initials: 'PS', text: 'This is getting worse every day. The smell is unbearable during evenings.', time: '1 day ago' },
            { id: 'c2', author: 'Amit K.', initials: 'AK', text: 'I saw a cleanup crew nearby yesterday, hopefully they get to this soon.', time: '18 hours ago' },
            { id: 'c3', author: 'Sneha R.', initials: 'SR', text: 'We need bigger bins in this area. The current ones are too small for the foot traffic.', time: '5 hours ago' },
        ],
    },
    {
        id: 'issue-2',
        title: 'Large pothole on MG Road causing accidents',
        description: 'A massive pothole has formed on MG Road near the intersection with Station Road. Multiple two-wheelers have skidded here in the past week. The pothole is approximately 2 feet wide and 8 inches deep. Immediate repair is needed before it causes a serious accident.',
        category: 'road',
        status: 'verified',
        location: { name: 'MG Road, near Station Junction', lat: 28.6329, lng: 77.2195 },
        image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?w=600&h=400&fit=crop',
        authorityId: 'auth-2',
        supportCount: 128,
        commentCount: 23,
        reportedBy: 'Deepak V.',
        reportedAt: '4 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 25, 2026 · 7:45 AM', description: 'Issue reported by Deepak V.', completed: true },
            { status: 'Verified', date: 'Feb 26, 2026 · 11:20 AM', description: 'Verified by traffic police team', completed: true },
            { status: 'Assigned', date: 'Pending', description: 'Awaiting assignment', completed: false },
            { status: 'Resolved', date: 'Pending', description: 'Awaiting resolution', completed: false },
        ],
        comments: [
            { id: 'c4', author: 'Vikram T.', initials: 'VT', text: 'I nearly fell off my bike here yesterday. Very dangerous at night!', time: '3 days ago' },
            { id: 'c5', author: 'Meera J.', initials: 'MJ', text: 'This has been reported multiple times. When will it be fixed?', time: '2 days ago' },
        ],
    },
    {
        id: 'issue-3',
        title: 'Water pipeline leak flooding residential street',
        description: 'A water main has burst on Sector 15 residential lane, causing continuous flooding for the past 2 days. The water pressure in nearby buildings has dropped significantly. Stagnant water is also creating mosquito breeding conditions.',
        category: 'water',
        status: 'reported',
        location: { name: 'Sector 15, Lane 3', lat: 28.5921, lng: 77.2307 },
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
        authorityId: 'auth-3',
        supportCount: 89,
        commentCount: 15,
        reportedBy: 'Kavita N.',
        reportedAt: '1 day ago',
        timeline: [
            { status: 'Reported', date: 'Feb 28, 2026 · 6:30 AM', description: 'Issue reported by Kavita N.', completed: true },
            { status: 'Verified', date: 'Pending', description: 'Awaiting verification', completed: false },
            { status: 'Assigned', date: 'Pending', description: 'Awaiting assignment', completed: false },
            { status: 'Resolved', date: 'Pending', description: 'Awaiting resolution', completed: false },
        ],
        comments: [
            { id: 'c6', author: 'Suresh P.', initials: 'SP', text: 'The water has started entering our basement. Please escalate this urgently!', time: '20 hours ago' },
        ],
    },
    {
        id: 'issue-4',
        title: 'Street light out on main walkway for a week',
        description: 'The street light near the community center on Park Avenue has been non-functional for over a week. This stretch becomes very dark after 7 PM and several residents, especially women, feel unsafe walking here after dark.',
        category: 'electricity',
        status: 'resolved',
        location: { name: 'Park Avenue, near Community Center', lat: 28.6225, lng: 77.2090 },
        image: 'https://images.unsplash.com/photo-1542621334-a254cf47733d?w=600&h=400&fit=crop',
        authorityId: 'auth-4',
        supportCount: 63,
        commentCount: 8,
        reportedBy: 'Anita G.',
        reportedAt: '1 week ago',
        timeline: [
            { status: 'Reported', date: 'Feb 22, 2026 · 8:00 PM', description: 'Issue reported by Anita G.', completed: true },
            { status: 'Verified', date: 'Feb 23, 2026 · 9:00 AM', description: 'Verified by area coordinator', completed: true },
            { status: 'Assigned', date: 'Feb 23, 2026 · 2:00 PM', description: 'Assigned to Electricity Board', completed: true },
            { status: 'Resolved', date: 'Feb 25, 2026 · 4:30 PM', description: 'Light fixture replaced successfully', completed: true },
        ],
        comments: [
            { id: 'c7', author: 'Anita G.', initials: 'AG', text: 'Thank you! The new light is working perfectly. The area feels so much safer now.', time: '4 days ago' },
        ],
    },
    {
        id: 'issue-5',
        title: 'Damaged railing on pedestrian overpass',
        description: 'The metal railing on the pedestrian overpass near the railway station is severely damaged and partially missing. This is extremely dangerous, especially during rush hours when the bridge gets crowded. Temporary barriers are needed immediately.',
        category: 'safety',
        status: 'assigned',
        location: { name: 'Railway Station Overpass', lat: 28.6430, lng: 77.2165 },
        image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop',
        authorityId: 'auth-2',
        supportCount: 156,
        commentCount: 31,
        reportedBy: 'Rajesh K.',
        reportedAt: '3 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 26, 2026 · 7:00 AM', description: 'Issue reported by Rajesh K.', completed: true },
            { status: 'Verified', date: 'Feb 26, 2026 · 10:30 AM', description: 'Verified as high-priority safety issue', completed: true },
            { status: 'Assigned', date: 'Feb 26, 2026 · 3:00 PM', description: 'Assigned to Public Works Dept.', completed: true },
            { status: 'Resolved', date: 'Pending', description: 'Repair work scheduled for this week', completed: false },
        ],
        comments: [
            { id: 'c8', author: 'Neha T.', initials: 'NT', text: 'This is so dangerous! I cross this bridge daily with my kids. Please prioritize this!', time: '2 days ago' },
            { id: 'c9', author: 'Manoj S.', initials: 'MS', text: 'At least put some temporary barriers until the repair is done.', time: '1 day ago' },
        ],
    },
    {
        id: 'issue-6',
        title: 'Illegal dumping site behind community hall',
        description: 'An unauthorized dumping ground has formed behind the community hall in Sector 22. Construction debris and household waste are being dumped regularly. The situation is creating health hazards for nearby residents.',
        category: 'garbage',
        status: 'verified',
        location: { name: 'Sector 22, Community Hall', lat: 28.6010, lng: 77.2250 },
        image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop',
        authorityId: 'auth-1',
        supportCount: 72,
        commentCount: 9,
        reportedBy: 'Pooja L.',
        reportedAt: '5 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 24, 2026 · 11:00 AM', description: 'Issue reported by Pooja L.', completed: true },
            { status: 'Verified', date: 'Feb 25, 2026 · 4:00 PM', description: 'Verified with photographic evidence', completed: true },
            { status: 'Assigned', date: 'Pending', description: 'Awaiting assignment', completed: false },
            { status: 'Resolved', date: 'Pending', description: 'Awaiting resolution', completed: false },
        ],
        comments: [
            { id: 'c10', author: 'Dr. Sharma', initials: 'DS', text: 'As a local physician, I can confirm this is creating serious health risks. Children in the area are getting skin infections.', time: '3 days ago' },
        ],
    },
    {
        id: 'issue-7',
        title: 'Broken water pump in public park',
        description: 'The drinking water pump in Green Valley Park has been broken for 2 weeks. This is the only public water source in the area and people, especially elderly walkers and children playing in the park, have no access to clean drinking water.',
        category: 'water',
        status: 'assigned',
        location: { name: 'Green Valley Park', lat: 28.6180, lng: 77.2350 },
        image: 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=600&h=400&fit=crop',
        authorityId: 'auth-3',
        supportCount: 34,
        commentCount: 6,
        reportedBy: 'Sanjay M.',
        reportedAt: '6 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 23, 2026 · 5:00 PM', description: 'Issue reported by Sanjay M.', completed: true },
            { status: 'Verified', date: 'Feb 24, 2026 · 10:00 AM', description: 'Verified by park management', completed: true },
            { status: 'Assigned', date: 'Feb 25, 2026 · 9:00 AM', description: 'Assigned to Water Supply Board', completed: true },
            { status: 'Resolved', date: 'Pending', description: 'Parts ordered, awaiting delivery', completed: false },
        ],
        comments: [],
    },
    {
        id: 'issue-8',
        title: 'Exposed electrical wires near school zone',
        description: 'Dangerously exposed electrical wires are hanging low near the entrance of Sunrise Public School. The wires are barely 6 feet from the ground. With children passing by every day, this is an extreme safety hazard that needs immediate attention.',
        category: 'electricity',
        status: 'reported',
        location: { name: 'Near Sunrise Public School', lat: 28.6290, lng: 77.2120 },
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop',
        authorityId: 'auth-4',
        supportCount: 203,
        commentCount: 42,
        reportedBy: 'Mrs. Kapoor',
        reportedAt: '12 hours ago',
        timeline: [
            { status: 'Reported', date: 'Mar 1, 2026 · 8:00 AM', description: 'Issue reported by Mrs. Kapoor', completed: true },
            { status: 'Verified', date: 'Pending', description: 'Awaiting urgent verification', completed: false },
            { status: 'Assigned', date: 'Pending', description: 'Awaiting assignment', completed: false },
            { status: 'Resolved', date: 'Pending', description: 'Awaiting resolution', completed: false },
        ],
        comments: [
            { id: 'c11', author: 'Principal Das', initials: 'PD', text: 'We have informed all parents to use the back gate until this is fixed. This is extremely urgent!', time: '10 hours ago' },
            { id: 'c12', author: 'Rakesh B.', initials: 'RB', text: 'I called the electricity helpline but got no response. This app is our last hope.', time: '6 hours ago' },
        ],
    },
    {
        id: 'issue-9',
        title: 'Road cave-in near bus stop creating danger zone',
        description: 'A section of the road near the Sector 10 bus stop has caved in due to recent heavy rains. The hole is about 3 feet deep and growing larger. Buses are being rerouted but pedestrians are at risk, especially at night.',
        category: 'road',
        status: 'assigned',
        location: { name: 'Sector 10 Bus Stop', lat: 28.6050, lng: 77.2180 },
        image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?w=600&h=400&fit=crop',
        authorityId: 'auth-2',
        supportCount: 94,
        commentCount: 18,
        reportedBy: 'Arjun D.',
        reportedAt: '2 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 27, 2026 · 6:00 AM', description: 'Issue reported by Arjun D.', completed: true },
            { status: 'Verified', date: 'Feb 27, 2026 · 8:00 AM', description: 'Emergency verified by traffic police', completed: true },
            { status: 'Assigned', date: 'Feb 27, 2026 · 12:00 PM', description: 'Assigned to Public Works Dept.', completed: true },
            { status: 'Resolved', date: 'Pending', description: 'Repair work in progress', completed: false },
        ],
        comments: [
            { id: 'c13', author: 'Bus Driver Ravi', initials: 'BR', text: 'We have been rerouting Bus 42 and 56. Commuters are facing 20-minute delays.', time: '1 day ago' },
        ],
    },
    {
        id: 'issue-10',
        title: 'Stray dog menace in residential colony',
        description: 'A pack of aggressive stray dogs has been creating fear in Sector 18 residential colony. Multiple children and morning walkers have been chased. Last week, a delivery person was bitten. Animal control and humane relocation is needed.',
        category: 'safety',
        status: 'verified',
        location: { name: 'Sector 18, Block C', lat: 28.6350, lng: 77.2280 },
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=400&fit=crop',
        authorityId: 'auth-5',
        supportCount: 67,
        commentCount: 14,
        reportedBy: 'Sunita W.',
        reportedAt: '3 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 26, 2026 · 7:30 AM', description: 'Issue reported by Sunita W.', completed: true },
            { status: 'Verified', date: 'Feb 27, 2026 · 11:00 AM', description: 'Verified by area RWA committee', completed: true },
            { status: 'Assigned', date: 'Pending', description: 'Awaiting assignment to animal control', completed: false },
            { status: 'Resolved', date: 'Pending', description: 'Awaiting resolution', completed: false },
        ],
        comments: [
            { id: 'c14', author: 'RWA President', initials: 'RP', text: 'We request humane handling of this situation. Animal welfare organizations should be involved.', time: '2 days ago' },
        ],
    },
    {
        id: 'issue-11',
        title: 'Blocked drainage causing waterlogging',
        description: 'The main drainage line on Highway Service Road is completely blocked with debris. Even light rain causes severe waterlogging, making the road impassable. The stagnant water is also damaging nearby shop foundations.',
        category: 'water',
        status: 'resolved',
        location: { name: 'Highway Service Road', lat: 28.5980, lng: 77.2400 },
        image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=600&h=400&fit=crop',
        authorityId: 'auth-1',
        supportCount: 112,
        commentCount: 26,
        reportedBy: 'Mohan R.',
        reportedAt: '2 weeks ago',
        timeline: [
            { status: 'Reported', date: 'Feb 15, 2026 · 10:00 AM', description: 'Issue reported by Mohan R.', completed: true },
            { status: 'Verified', date: 'Feb 16, 2026 · 9:00 AM', description: 'Verified after site inspection', completed: true },
            { status: 'Assigned', date: 'Feb 17, 2026 · 11:00 AM', description: 'Assigned to Municipal Corporation', completed: true },
            { status: 'Resolved', date: 'Feb 22, 2026 · 4:00 PM', description: 'Drainage cleared and repaired', completed: true },
        ],
        comments: [
            { id: 'c15', author: 'Mohan R.', initials: 'MR', text: 'Great work by the team! The drainage is flowing smoothly now. Thank you ClearCity!', time: '1 week ago' },
        ],
    },
    {
        id: 'issue-12',
        title: 'Missing manhole cover on busy footpath',
        description: 'A manhole cover is missing on the main footpath outside Metro Station Gate 2. The open manhole is a serious hazard for pedestrians, especially at night when visibility is low. A temporary barrier has been placed by locals but a permanent fix is needed.',
        category: 'other',
        status: 'assigned',
        location: { name: 'Metro Station, Gate 2', lat: 28.6200, lng: 77.2150 },
        image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=400&fit=crop',
        authorityId: 'auth-6',
        supportCount: 88,
        commentCount: 11,
        reportedBy: 'Farhan A.',
        reportedAt: '4 days ago',
        timeline: [
            { status: 'Reported', date: 'Feb 25, 2026 · 9:00 PM', description: 'Issue reported by Farhan A.', completed: true },
            { status: 'Verified', date: 'Feb 26, 2026 · 8:00 AM', description: 'Verified as urgent safety issue', completed: true },
            { status: 'Assigned', date: 'Feb 26, 2026 · 1:00 PM', description: 'Assigned to City Planning Office', completed: true },
            { status: 'Resolved', date: 'Pending', description: 'New cover being fabricated', completed: false },
        ],
        comments: [
            { id: 'c16', author: 'Metro Staff', initials: 'MS', text: 'We have placed warning cones around the area. Please be careful when exiting from Gate 2.', time: '3 days ago' },
        ],
    },
];

// --- User Profile ---
export const userProfile: UserProfile = {
    name: 'Rahul Mehta',
    initials: 'RM',
    joinedDate: 'Member since Jan 2026',
    reportsPosted: 8,
    issuesSupported: 24,
    contributions: 32,
    badges: [
        { name: 'First Report', color: '#2563EB', bgColor: '#EFF6FF', icon: 'flag' },
        { name: 'Top Supporter', color: '#16A34A', bgColor: '#F0FDF4', icon: 'heart' },
        { name: 'Verified', color: '#8B5CF6', bgColor: '#F5F3FF', icon: 'check-circle' },
        { name: 'Community Hero', color: '#F59E0B', bgColor: '#FFFBEB', icon: 'award' },
    ],
};

// Category config
export const categories = [
    { key: 'garbage', label: 'Garbage', icon: 'trash-2' },
    { key: 'road', label: 'Road Damage', icon: 'triangle-alert' },
    { key: 'water', label: 'Water Issue', icon: 'droplets' },
    { key: 'electricity', label: 'Electricity', icon: 'zap' },
    { key: 'safety', label: 'Public Safety', icon: 'shield-alert' },
    { key: 'other', label: 'Other', icon: 'circle-ellipsis' },
] as const;

// Helper functions
export function getAuthority(id: string): Authority | undefined {
    return authorities.find(a => a.id === id);
}

export function getIssue(id: string): Issue | undefined {
    return issues.find(i => i.id === id);
}

export function getIssuesByAuthority(authorityId: string): Issue[] {
    return issues.filter(i => i.authorityId === authorityId);
}

export function getIssuesByCategory(category: string): Issue[] {
    if (category === 'all') return issues;
    return issues.filter(i => i.category === category);
}
