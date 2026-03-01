'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, MessageCircle, Heart } from 'lucide-react';
import type { Issue } from '@/data/dummy-data';
import { getAuthority } from '@/data/dummy-data';
import StatusBadge from './StatusBadge';
import CategoryTag from './CategoryTag';

interface IssueCardProps {
    issue: Issue;
}

export default function IssueCard({ issue }: IssueCardProps) {
    const [supported, setSupported] = useState(false);
    const [supportCount, setSupportCount] = useState(issue.supportCount);
    const [bouncing, setBouncing] = useState(false);
    const authority = getAuthority(issue.authorityId);

    const handleSupport = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!supported) {
            setSupportCount(prev => prev + 1);
            setSupported(true);
            setBouncing(true);
            setTimeout(() => setBouncing(false), 400);
        } else {
            setSupportCount(prev => prev - 1);
            setSupported(false);
        }
    };

    const handleAuthorityClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = `/authority/${issue.authorityId}`;
    };

    return (
        <Link href={`/issue/${issue.id}`} style={{ textDecoration: 'none' }}>
            <article className="issue-card" id={`issue-card-${issue.id}`}>
                <div className="issue-card-image-wrapper">
                    <img
                        className="issue-card-image"
                        src={issue.image}
                        alt={issue.title}
                        loading="lazy"
                    />
                </div>

                <div className="issue-card-body">
                    <div className="issue-card-meta">
                        <StatusBadge status={issue.status} />
                        <CategoryTag category={issue.category} />
                    </div>

                    <h3 className="issue-card-title">{issue.title}</h3>

                    <div className="issue-card-location">
                        <MapPin size={12} />
                        {issue.location.name}
                    </div>

                    <div className="issue-card-footer">
                        {authority && (
                            <button
                                className="issue-card-authority"
                                onClick={handleAuthorityClick}
                                aria-label={`View ${authority.name} profile`}
                            >
                                <span className="issue-card-authority-avatar">
                                    {authority.initials}
                                </span>
                                {authority.name}
                            </button>
                        )}

                        <div className="issue-card-actions">
                            <button
                                className={`support-btn${supported ? ' active' : ''}${bouncing ? ' bounce' : ''}`}
                                onClick={handleSupport}
                                aria-label={`Support this issue (${supportCount} supporters)`}
                            >
                                <Heart size={14} fill={supported ? 'currentColor' : 'none'} />
                                {supportCount}
                            </button>

                            <span className="comment-count">
                                <MessageCircle size={14} />
                                {issue.commentCount}
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        </Link>
    );
}
