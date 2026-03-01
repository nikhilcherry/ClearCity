'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin } from 'lucide-react';
import { issues, categories } from '@/data/dummy-data';
import StatusBadge from '@/components/StatusBadge';
import BottomNav from '@/components/BottomNav';

const statusColors: Record<string, string> = {
    reported: '#EF4444',
    verified: '#8B5CF6',
    assigned: '#F59E0B',
    resolved: '#16A34A',
};

export default function MapPage() {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

    const filteredIssues = activeFilter === 'all'
        ? issues
        : issues.filter(i => i.category === activeFilter);

    const selected = filteredIssues.find(i => i.id === selectedIssue);

    return (
        <div className="page-content" style={{ paddingBottom: 0 }}>
            <div className="map-container">
                {/* Simulated Map Background */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(135deg, #E8F4FD 0%, #D4E8F7 30%, #E0EEF5 60%, #EBF3FA 100%)',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Grid lines to simulate map */}
                    <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.15 }}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <line key={`h${i}`} x1="0" y1={`${i * 5}%`} x2="100%" y2={`${i * 5}%`} stroke="#2563EB" strokeWidth="0.5" />
                        ))}
                        {Array.from({ length: 20 }).map((_, i) => (
                            <line key={`v${i}`} x1={`${i * 5}%`} y1="0" x2={`${i * 5}%`} y2="100%" stroke="#2563EB" strokeWidth="0.5" />
                        ))}
                    </svg>

                    {/* Street labels */}
                    <div style={{ position: 'absolute', top: '15%', left: '10%', fontSize: '10px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.1em', transform: 'rotate(-15deg)' }}>MG ROAD</div>
                    <div style={{ position: 'absolute', top: '40%', left: '25%', fontSize: '10px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.1em', transform: 'rotate(5deg)' }}>PARK AVENUE</div>
                    <div style={{ position: 'absolute', top: '65%', left: '50%', fontSize: '10px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.1em', transform: 'rotate(-8deg)' }}>HIGHWAY SERVICE RD</div>
                    <div style={{ position: 'absolute', top: '30%', right: '10%', fontSize: '10px', color: '#94A3B8', fontWeight: 500, letterSpacing: '0.1em', transform: 'rotate(12deg)' }}>SECTOR 15</div>

                    {/* Park Area */}
                    <div style={{
                        position: 'absolute',
                        top: '25%',
                        left: '35%',
                        width: 80,
                        height: 60,
                        borderRadius: 'var(--radius-xl)',
                        background: 'rgba(22, 163, 74, 0.08)',
                        border: '1px solid rgba(22, 163, 74, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '9px',
                        color: '#16A34A',
                        fontWeight: 600,
                    }}>
                        Central Park
                    </div>

                    {/* Issue Pins */}
                    {filteredIssues.map((issue, idx) => {
                        // Distribute pins across the map area
                        const positions = [
                            { top: '20%', left: '30%' },
                            { top: '35%', left: '55%' },
                            { top: '50%', left: '20%' },
                            { top: '15%', left: '70%' },
                            { top: '45%', left: '75%' },
                            { top: '60%', left: '40%' },
                            { top: '72%', left: '65%' },
                            { top: '28%', left: '45%' },
                            { top: '55%', left: '55%' },
                            { top: '68%', left: '25%' },
                            { top: '38%', left: '15%' },
                            { top: '80%', left: '50%' },
                        ];
                        const pos = positions[idx % positions.length];

                        return (
                            <button
                                key={issue.id}
                                onClick={() => setSelectedIssue(selectedIssue === issue.id ? null : issue.id)}
                                style={{
                                    position: 'absolute',
                                    ...pos,
                                    transform: selectedIssue === issue.id ? 'translate(-50%, -50%) scale(1.3)' : 'translate(-50%, -50%)',
                                    width: 32,
                                    height: 32,
                                    borderRadius: 'var(--radius-full)',
                                    background: statusColors[issue.status],
                                    border: '3px solid white',
                                    boxShadow: selectedIssue === issue.id
                                        ? `0 0 0 3px ${statusColors[issue.status]}40, 0 4px 12px rgba(0,0,0,0.2)`
                                        : '0 2px 8px rgba(0,0,0,0.15)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                    zIndex: selectedIssue === issue.id ? 10 : 1,
                                }}
                                aria-label={`Issue: ${issue.title}`}
                            >
                                <MapPin size={14} fill="white" />
                            </button>
                        );
                    })}
                </div>

                {/* Filter Chips */}
                <div className="map-filters">
                    <button
                        className={`map-filter-chip${activeFilter === 'all' ? ' active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.key}
                            className={`map-filter-chip${activeFilter === cat.key ? ' active' : ''}`}
                            onClick={() => setActiveFilter(cat.key)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Selected Issue Preview */}
                {selected && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 80,
                            left: 'var(--space-4)',
                            right: 'var(--space-4)',
                            zIndex: 1000,
                            animation: 'slideUp 0.3s ease',
                        }}
                    >
                        <div
                            className="map-preview-card"
                            style={{ width: '100%', cursor: 'pointer' }}
                            onClick={() => router.push(`/issue/${selected.id}`)}
                        >
                            <img className="map-preview-image" src={selected.image} alt={selected.title} />
                            <div className="map-preview-body">
                                <div className="map-preview-title">{selected.title}</div>
                                <div className="map-preview-meta">
                                    <StatusBadge status={selected.status} />
                                    <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
                                        {selected.supportCount} supporters
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Legend */}
                <div style={{
                    position: 'absolute',
                    bottom: selected ? 260 : 80,
                    right: 'var(--space-4)',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: 'var(--radius-lg)',
                    padding: 'var(--space-3)',
                    boxShadow: 'var(--shadow-md)',
                    zIndex: 999,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)',
                    transition: 'bottom 0.3s ease',
                }}>
                    {[
                        { label: 'Reported', color: '#EF4444' },
                        { label: 'Verified', color: '#8B5CF6' },
                        { label: 'Assigned', color: '#F59E0B' },
                        { label: 'Resolved', color: '#16A34A' },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <div style={{
                                width: 10,
                                height: 10,
                                borderRadius: 'var(--radius-full)',
                                background: item.color,
                            }} />
                            <span style={{ fontSize: '0.625rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
}
