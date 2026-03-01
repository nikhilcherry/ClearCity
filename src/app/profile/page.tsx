'use client';

import { useRouter } from 'next/navigation';
import { Flag, Heart, CheckCircle, Award, ChevronRight } from 'lucide-react';
import { userProfile, issues } from '@/data/dummy-data';
import StatusBadge from '@/components/StatusBadge';
import BottomNav from '@/components/BottomNav';

const badgeIcons: Record<string, React.ElementType> = {
    flag: Flag,
    heart: Heart,
    'check-circle': CheckCircle,
    award: Award,
};

export default function ProfilePage() {
    const router = useRouter();
    const userIssues = issues.slice(0, 4); // simulate user's reports

    return (
        <div className="page-content">
            {/* Profile Header */}
            <div className="profile-header">
                <div className="profile-avatar">{userProfile.initials}</div>
                <h1 className="profile-name">{userProfile.name}</h1>
                <p className="profile-subtitle">{userProfile.joinedDate}</p>
            </div>

            {/* Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-value">{userProfile.reportsPosted}</div>
                    <div className="stat-label">Reports</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{userProfile.issuesSupported}</div>
                    <div className="stat-label">Supported</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{userProfile.contributions}</div>
                    <div className="stat-label">Contributions</div>
                </div>
            </div>

            {/* Badges */}
            <div className="section-divider">
                <h2 className="section-divider-title">Badges Earned</h2>
            </div>
            <div className="badge-list">
                {userProfile.badges.map(badge => {
                    const Icon = badgeIcons[badge.icon] || Award;
                    return (
                        <div key={badge.name} className="badge-item">
                            <div
                                className="badge-icon"
                                style={{ background: badge.bgColor, color: badge.color }}
                            >
                                <Icon size={20} />
                            </div>
                            <span className="badge-label">{badge.name}</span>
                        </div>
                    );
                })}
            </div>

            {/* My Reports */}
            <div className="section-divider">
                <h2 className="section-divider-title">My Reports</h2>
            </div>
            {userIssues.map(issue => (
                <div
                    key={issue.id}
                    className="mini-issue-card"
                    onClick={() => router.push(`/issue/${issue.id}`)}
                >
                    <img className="mini-issue-image" src={issue.image} alt={issue.title} />
                    <div className="mini-issue-content">
                        <div className="mini-issue-title">{issue.title}</div>
                        <div className="mini-issue-meta">
                            <StatusBadge status={issue.status} />
                            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
                                {issue.reportedAt}
                            </span>
                        </div>
                    </div>
                    <ChevronRight size={16} color="var(--color-text-tertiary)" style={{ alignSelf: 'center' }} />
                </div>
            ))}

            <BottomNav />
        </div>
    );
}
