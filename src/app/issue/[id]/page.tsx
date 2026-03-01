'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MapPin, Heart, Building2, Clock } from 'lucide-react';
import { getIssue, getAuthority } from '@/data/dummy-data';
import StatusBadge from '@/components/StatusBadge';
import CategoryTag from '@/components/CategoryTag';
import BottomNav from '@/components/BottomNav';

export default function IssueDetailPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const issue = getIssue(id);
    const [supported, setSupported] = useState(false);
    const [supportCount, setSupportCount] = useState(issue?.supportCount || 0);

    if (!issue) {
        return (
            <div className="page-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
                <p style={{ color: 'var(--color-text-tertiary)' }}>Issue not found.</p>
            </div>
        );
    }

    const authority = getAuthority(issue.authorityId);

    const handleSupport = () => {
        if (!supported) {
            setSupportCount(prev => prev + 1);
            setSupported(true);
        } else {
            setSupportCount(prev => prev - 1);
            setSupported(false);
        }
    };

    return (
        <div className="page-content">
            {/* Hero Image */}
            <div className="detail-hero">
                <img src={issue.image} alt={issue.title} />
                <button
                    className="detail-back-btn"
                    onClick={() => router.back()}
                    aria-label="Go back"
                >
                    <ArrowLeft size={18} />
                </button>
                <StatusBadge status={issue.status} />
            </div>

            {/* Body */}
            <div className="detail-body">
                <div style={{ marginBottom: 'var(--space-3)' }}>
                    <CategoryTag category={issue.category} />
                </div>

                <h1 className="detail-title">{issue.title}</h1>
                <p className="detail-description">{issue.description}</p>

                {/* Info Rows */}
                <div className="detail-info-row">
                    <div className="detail-info-icon" style={{ background: 'var(--color-primary-50)', color: 'var(--color-primary)' }}>
                        <MapPin size={18} />
                    </div>
                    <div className="detail-info-content">
                        <span className="detail-info-label">Location</span>
                        <span className="detail-info-value">{issue.location.name}</span>
                    </div>
                </div>

                {authority && (
                    <div
                        className="detail-info-row"
                        style={{ cursor: 'pointer' }}
                        onClick={() => router.push(`/authority/${authority.id}`)}
                    >
                        <div className="detail-info-icon" style={{ background: 'var(--color-info-50)', color: 'var(--color-info)' }}>
                            <Building2 size={18} />
                        </div>
                        <div className="detail-info-content">
                            <span className="detail-info-label">Tagged Authority</span>
                            <span className="detail-info-value">{authority.name}</span>
                        </div>
                    </div>
                )}

                <div className="detail-info-row">
                    <div className="detail-info-icon" style={{ background: 'var(--color-warning-50)', color: 'var(--color-warning)' }}>
                        <Clock size={18} />
                    </div>
                    <div className="detail-info-content">
                        <span className="detail-info-label">Reported</span>
                        <span className="detail-info-value">{issue.reportedAt} by {issue.reportedBy}</span>
                    </div>
                </div>

                {/* Map Preview */}
                <div className="detail-section">
                    <h2 className="detail-section-title">Location</h2>
                    <div className="map-preview-mini" style={{
                        background: `url('https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s+2563eb(${issue.location.lng},${issue.location.lat})/${issue.location.lng},${issue.location.lat},14,0/480x140@2x?access_token=placeholder') center/cover no-repeat, linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--color-primary)',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 'var(--space-1)',
                        }}>
                            <MapPin size={24} />
                            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>
                                {issue.location.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Timeline */}
                <div className="detail-section">
                    <h2 className="detail-section-title">Progress Timeline</h2>
                    <div className="timeline">
                        {issue.timeline.map((event, idx) => {
                            const isActive = event.completed && !issue.timeline[idx + 1]?.completed;
                            const isPending = !event.completed;

                            return (
                                <div
                                    key={idx}
                                    className={`timeline-item${isPending ? ' pending' : ''}`}
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    <div className={`timeline-dot${event.completed ? (isActive ? ' active' : ' completed') : ''}`} />
                                    <div className="timeline-title">{event.status}</div>
                                    <div className="timeline-date">{event.date}</div>
                                    {event.description && (
                                        <div style={{
                                            fontSize: 'var(--font-size-xs)',
                                            color: 'var(--color-text-tertiary)',
                                            marginTop: '2px',
                                        }}>
                                            {event.description}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Comments */}
                <div className="detail-section">
                    <h2 className="detail-section-title">
                        Comments ({issue.comments.length})
                    </h2>
                    {issue.comments.length > 0 ? (
                        issue.comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <div className="comment-avatar">{comment.initials}</div>
                                <div className="comment-body">
                                    <div className="comment-author">{comment.author}</div>
                                    <div className="comment-text">{comment.text}</div>
                                    <div className="comment-time">{comment.time}</div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-text-tertiary)',
                            textAlign: 'center',
                            padding: 'var(--space-4)',
                        }}>
                            No comments yet. Be the first to comment.
                        </p>
                    )}

                    {/* Comment Input */}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        marginTop: 'var(--space-3)',
                        paddingTop: 'var(--space-3)',
                        borderTop: '1px solid var(--color-border-light)',
                    }}>
                        <div className="comment-avatar" style={{ background: 'var(--color-success-100)', color: 'var(--color-success)' }}>RM</div>
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                borderRadius: 'var(--radius-full)',
                                border: '1.5px solid var(--color-border)',
                                fontSize: 'var(--font-size-sm)',
                                outline: 'none',
                                transition: 'border-color var(--transition-fast)',
                            }}
                            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
                            onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
                        />
                    </div>
                </div>

                {/* Spacer for floating button */}
                <div style={{ height: '120px' }} />
            </div>

            {/* Floating Support Button */}
            <button
                className="floating-support-bar"
                onClick={handleSupport}
                style={{
                    background: supported ? 'var(--color-success)' : 'var(--color-primary)',
                    boxShadow: supported
                        ? '0 6px 20px rgba(22,163,74,0.35)'
                        : 'var(--shadow-fab)',
                }}
            >
                <Heart size={18} fill={supported ? 'currentColor' : 'none'} />
                {supported ? 'Supporting' : 'Support this issue'} · {supportCount}
            </button>

            <BottomNav />
        </div>
    );
}
