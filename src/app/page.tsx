'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { issues, categories } from '@/data/dummy-data';
import IssueCard from '@/components/IssueCard';
import BottomNav from '@/components/BottomNav';

export default function FeedPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredIssues = activeFilter === 'all'
    ? issues
    : issues.filter(i => i.category === activeFilter);

  return (
    <div className="page-content">
      <header className="app-header">
        <div className="header-row">
          <div>
            <h1>Clear<span>City</span></h1>
            <p className="header-subtitle">Civic Issue Tracker</p>
          </div>
          <button
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-lg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-secondary)',
              background: 'var(--color-bg)',
            }}
            aria-label="Filter options"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </header>

      <div className="feed-container">
        <div className="feed-filters">
          <button
            className={`filter-chip${activeFilter === 'all' ? ' active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Issues
          </button>
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`filter-chip${activeFilter === cat.key ? ' active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {filteredIssues.map(issue => (
          <IssueCard key={issue.id} issue={issue} />
        ))}

        {filteredIssues.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: 'var(--space-12) var(--space-4)',
            color: 'var(--color-text-tertiary)',
          }}>
            <p style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
              No issues found in this category.
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
