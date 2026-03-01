'use client';

interface StatusBadgeProps {
    status: 'reported' | 'verified' | 'assigned' | 'resolved';
    onClick?: (e: React.MouseEvent) => void;
}

const statusLabels: Record<string, string> = {
    reported: 'Reported',
    verified: 'Verified',
    assigned: 'Assigned',
    resolved: 'Resolved',
};

export default function StatusBadge({ status, onClick }: StatusBadgeProps) {
    return (
        <span
            className={`status-badge ${status}`}
            onClick={onClick}
            role={onClick ? 'button' : undefined}
            tabIndex={onClick ? 0 : undefined}
        >
            <span className={`status-dot ${status}`} />
            {statusLabels[status]}
        </span>
    );
}
