'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Map, Plus, User } from 'lucide-react';

export default function BottomNav() {
    const pathname = usePathname();

    // Hide nav on report flow
    if (pathname.startsWith('/report')) return null;

    const tabs = [
        { href: '/', icon: Home, label: 'Feed' },
        { href: '/map', icon: Map, label: 'Map' },
        { href: '/report', icon: Plus, label: 'Report', isReport: true },
        { href: '/profile', icon: User, label: 'Profile' },
    ];

    return (
        <nav className="bottom-nav">
            <div className="nav-items">
                {tabs.map((tab) => {
                    const isActive = tab.href === '/'
                        ? pathname === '/'
                        : pathname.startsWith(tab.href);

                    if (tab.isReport) {
                        return (
                            <div key={tab.href} className="nav-item nav-item-report">
                                <Link href={tab.href} className="report-fab" aria-label="Report Issue">
                                    <Plus size={24} strokeWidth={2.5} />
                                </Link>
                                <span className="nav-item-label" style={{ marginTop: '4px', color: 'var(--color-text-tertiary)', fontSize: '0.625rem', fontWeight: 600 }}>
                                    Report
                                </span>
                            </div>
                        );
                    }

                    return (
                        <Link
                            key={tab.href}
                            href={tab.href}
                            className={`nav-item${isActive ? ' active' : ''}`}
                        >
                            <tab.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
                            <span className="nav-item-label">{tab.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
