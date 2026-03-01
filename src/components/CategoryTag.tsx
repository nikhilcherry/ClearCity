'use client';

import {
    Trash2, TriangleAlert, Droplets, Zap, ShieldAlert, CircleEllipsis,
} from 'lucide-react';

const iconMap: Record<string, React.ElementType> = {
    garbage: Trash2,
    road: TriangleAlert,
    water: Droplets,
    electricity: Zap,
    safety: ShieldAlert,
    other: CircleEllipsis,
};

const labelMap: Record<string, string> = {
    garbage: 'Garbage',
    road: 'Road Damage',
    water: 'Water Issue',
    electricity: 'Electricity',
    safety: 'Public Safety',
    other: 'Other',
};

interface CategoryTagProps {
    category: string;
}

export default function CategoryTag({ category }: CategoryTagProps) {
    const Icon = iconMap[category] || CircleEllipsis;
    return (
        <span className="category-tag">
            <Icon size={12} />
            {labelMap[category] || category}
        </span>
    );
}
