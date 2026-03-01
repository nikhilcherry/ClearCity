'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { authorities, getIssuesByAuthority } from '@/data/dummy-data';
import StatusBadge from '@/components/StatusBadge';
import BottomNav from '@/components/BottomNav';

export default function AuthorityPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const authority = authorities.find(a => a.id === id);

    if (!authority) {
        return (
            <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <p style={{ color: 'var(--color-text-tertiary)' }}>Authority not found.</p>
            </div>
        );
    }

    const authorityIssues = getIssuesByAuthority(authority.id);
    const resolvedPct = Math.round((authority.resolvedIssues / authority.totalIssues) * 100);

    return (
        <div className="page-content">
            {/* Back button */}
            <div style={{ padding: 'var(--space-4) var(--space-5) 0' }}>
                <button
                    onClick={() => router.back()}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        color: 'var(--color-text-secondary)',
                        fontSize: 'var(--font-size-sm)',
                        fontWeight: 500,
                    }}
                    aria-label="Go back"
                >
                    <ArrowLeft size={18} />
                    Back
                </button>
            </div>

            {/* Authority Header */}
            <div className="authority-header">
                <div className="authority-avatar">{authority.initials}</div>
                <h1 className="authority-name">{authority.name}</h1>
                <p className="authority-department">{authority.department}</p>
            </div>

            {/* Stats */}
            <div className="authority-stats">
                <div className="authority-stat">
                    <div className="stat-value">{authority.totalIssues}</div>
                    <div className="stat-label">Total Issues</div>
                </div>
                <div className="authority-stat">
                    <div className="stat-value" style={{ color: 'var(--color-success)' }}>{authority.avgResolutionDays}d</div>
                    <div className="stat-label">Avg. Resolution</div>
                </div>
                <div className="authority-stat">
                    <div className="stat-value" style={{ color: resolvedPct >= 80 ? 'var(--color-success)' : 'var(--color-warning)' }}>
                        {resolvedPct}%
                    </div>
                    <div className="stat-label">Resolved</div>
                </div>
            </div>

            {/* Resolution Progress Bar */}
            <div style={{ padding: '0 var(--space-5) var(--space-4)' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--space-2)',
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-secondary)',
                }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <CheckCircle size={12} color="var(--color-success)" />
                        {authority.resolvedIssues} resolved
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                        <AlertCircle size={12} color="var(--color-warning)" />
                        {authority.totalIssues - authority.resolvedIssues} open
                    </span>
                </div>
                <div style={{
                    width: '100%',
                    height: 8,
                    borderRadius: 'var(--radius-full)',
                    background: 'var(--color-border-light)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        height: '100%',
                        width: `${resolvedPct}%`,
                        borderRadius: 'var(--radius-full)',
                        background: `linear-gradient(90deg, var(--color-success), var(--color-success-light))`,
                        transition: 'width 1s ease',
                    }} />
                </div>
            </div>

            {/* Assigned Issues */}
            <div className="section-divider">
                <h2 className="section-divider-title">
                    Assigned Issues ({authorityIssues.length})
                </h2>
            </div>

            {authorityIssues.map(issue => (
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
                            <span style={{
                                fontSize: 'var(--font-size-xs)',
                                color: 'var(--color-text-tertiary)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <Clock size={10} />
                                {issue.reportedAt}
                            </span>
                        </div>
                    </div>
                    <ChevronRight size={16} color="var(--color-text-tertiary)" style={{ alignSelf: 'center' }} />
                </div>
            ))}

            {authorityIssues.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: 'var(--space-8)',
                    color: 'var(--color-text-tertiary)',
                    fontSize: 'var(--font-size-sm)',
                }}>
                    No issues currently assigned to this authority.
                </div>
            )}

            <BottomNav />
        </div>
    );
}
