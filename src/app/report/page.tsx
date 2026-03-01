'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
    X, Camera, Upload, MapPin, ArrowRight, ArrowLeft,
    Trash2, TriangleAlert, Droplets, Zap, ShieldAlert, CircleEllipsis,
    CheckCircle, Send,
} from 'lucide-react';
import { authorities, categories } from '@/data/dummy-data';

const TOTAL_STEPS = 6;

const categoryIcons: Record<string, React.ElementType> = {
    garbage: Trash2,
    road: TriangleAlert,
    water: Droplets,
    electricity: Zap,
    safety: ShieldAlert,
    other: CircleEllipsis,
};

export default function ReportPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    // Form state
    const [photo, setPhoto] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [description, setDescription] = useState('');
    const [selectedAuthority, setSelectedAuthority] = useState('');
    const [locationName] = useState('Sector 15, Main Road');

    const handlePhotoUpload = useCallback(() => {
        // Simulate photo upload with a dummy image
        setPhoto('https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&h=400&fit=crop');
    }, []);

    const canProceed = () => {
        switch (step) {
            case 1: return !!photo;
            case 2: return true; // location auto-detected
            case 3: return !!selectedCategory;
            case 4: return description.trim().length > 5;
            case 5: return !!selectedAuthority;
            case 6: return true;
            default: return false;
        }
    };

    const handleNext = () => {
        if (step < TOTAL_STEPS) {
            setStep(step + 1);
        } else {
            setSubmitted(true);
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    if (submitted) {
        return (
            <div className="report-page">
                <div className="success-screen">
                    <div className="success-icon">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="success-title">Issue Reported!</h2>
                    <p className="success-text">
                        Your report has been submitted successfully. We&apos;ll notify you when there&apos;s an update on your issue.
                    </p>
                    <button
                        className="btn btn-primary"
                        onClick={() => router.push('/')}
                        style={{ width: '100%', maxWidth: 280 }}
                    >
                        Back to Feed
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => {
                            setSubmitted(false);
                            setStep(1);
                            setPhoto(null);
                            setSelectedCategory(null);
                            setDescription('');
                            setSelectedAuthority('');
                        }}
                        style={{ width: '100%', maxWidth: 280, marginTop: 'var(--space-2)' }}
                    >
                        Report Another Issue
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="report-page">
            {/* Header */}
            <div className="report-header">
                <button className="report-close-btn" onClick={() => router.back()} aria-label="Close">
                    <X size={20} />
                </button>
                <span className="report-header-title">Report Issue</span>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 600 }}>
                    {step}/{TOTAL_STEPS}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="report-progress">
                {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                    <div
                        key={i}
                        className={`report-progress-bar${i < step - 1 ? ' filled' : ''}${i === step - 1 ? ' active' : ''}`}
                    />
                ))}
            </div>

            {/* Steps */}
            <div key={step}>
                {step === 1 && (
                    <div className="report-step">
                        <span className="report-step-label">Step 1</span>
                        <h2 className="report-step-title">Add a Photo</h2>
                        <p className="report-step-desc">Take a photo or upload from your gallery. Visual proof helps authorities respond faster.</p>

                        <div
                            className={`photo-upload-zone${photo ? ' has-photo' : ''}`}
                            onClick={handlePhotoUpload}
                            role="button"
                            tabIndex={0}
                            aria-label="Upload photo"
                        >
                            {photo ? (
                                <img src={photo} alt="Uploaded issue" />
                            ) : (
                                <>
                                    <Camera size={32} />
                                    <span className="photo-upload-text">Tap to take a photo</span>
                                    <span className="photo-upload-hint">or upload from gallery</span>
                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--space-3)',
                                        marginTop: 'var(--space-3)',
                                    }}>
                                        <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handlePhotoUpload(); }} style={{ padding: 'var(--space-2) var(--space-4)' }}>
                                            <Camera size={16} /> Camera
                                        </button>
                                        <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); handlePhotoUpload(); }} style={{ padding: 'var(--space-2) var(--space-4)' }}>
                                            <Upload size={16} /> Gallery
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="report-step">
                        <span className="report-step-label">Step 2</span>
                        <h2 className="report-step-title">Confirm Location</h2>
                        <p className="report-step-desc">We&apos;ve auto-detected your location. Adjust the pin if needed.</p>

                        {/* Simulated Map */}
                        <div style={{
                            width: '100%',
                            height: 200,
                            borderRadius: 'var(--radius-xl)',
                            background: 'linear-gradient(135deg, var(--color-primary-50), var(--color-primary-100))',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 'var(--space-2)',
                            color: 'var(--color-primary)',
                            marginBottom: 'var(--space-4)',
                            border: '2px solid var(--color-primary-200)',
                        }}>
                            <MapPin size={32} />
                            <span style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>Pin dropped here</span>
                        </div>

                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--color-bg)',
                            borderRadius: 'var(--radius-xl)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-3)',
                        }}>
                            <MapPin size={18} color="var(--color-primary)" />
                            <div>
                                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 500 }}>Detected Location</div>
                                <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600 }}>{locationName}</div>
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="report-step">
                        <span className="report-step-label">Step 3</span>
                        <h2 className="report-step-title">Select Category</h2>
                        <p className="report-step-desc">Choose the type of issue you&apos;re reporting.</p>

                        <div className="category-grid">
                            {categories.map((cat) => {
                                const Icon = categoryIcons[cat.key] || CircleEllipsis;
                                return (
                                    <button
                                        key={cat.key}
                                        className={`category-option${selectedCategory === cat.key ? ' selected' : ''}`}
                                        onClick={() => setSelectedCategory(cat.key)}
                                        aria-label={cat.label}
                                        aria-pressed={selectedCategory === cat.key}
                                    >
                                        <div className="category-option-icon">
                                            <Icon size={22} />
                                        </div>
                                        <span className="category-option-label">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div className="report-step">
                        <span className="report-step-label">Step 4</span>
                        <h2 className="report-step-title">Describe the Issue</h2>
                        <p className="report-step-desc">Briefly describe what&apos;s wrong. Be specific to help authorities understand.</p>

                        <textarea
                            className="description-input"
                            placeholder="What is the issue? Be descriptive..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            maxLength={500}
                        />
                        <div style={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 'var(--space-2)',
                            fontSize: 'var(--font-size-xs)',
                            color: description.length > 450 ? 'var(--color-warning)' : 'var(--color-text-tertiary)',
                        }}>
                            {description.length}/500
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="report-step">
                        <span className="report-step-label">Step 5</span>
                        <h2 className="report-step-title">Tag Authority</h2>
                        <p className="report-step-desc">Select the responsible authority to direct your report.</p>

                        <select
                            className="authority-select"
                            value={selectedAuthority}
                            onChange={(e) => setSelectedAuthority(e.target.value)}
                        >
                            <option value="">Choose an authority...</option>
                            {authorities.map(auth => (
                                <option key={auth.id} value={auth.id}>
                                    {auth.name} — {auth.department}
                                </option>
                            ))}
                        </select>

                        {selectedAuthority && (
                            <div style={{
                                marginTop: 'var(--space-4)',
                                padding: 'var(--space-4)',
                                background: 'var(--color-primary-50)',
                                borderRadius: 'var(--radius-xl)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-3)',
                                animation: 'fadeIn 0.3s ease',
                            }}>
                                <div style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 'var(--radius-full)',
                                    background: 'var(--color-primary-100)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'var(--color-primary)',
                                    fontWeight: 700,
                                    fontSize: 'var(--font-size-sm)',
                                }}>
                                    {authorities.find(a => a.id === selectedAuthority)?.initials}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)' }}>
                                        {authorities.find(a => a.id === selectedAuthority)?.name}
                                    </div>
                                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                                        {authorities.find(a => a.id === selectedAuthority)?.department}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {step === 6 && (
                    <div className="report-step">
                        <span className="report-step-label">Step 6</span>
                        <h2 className="report-step-title">Review & Submit</h2>
                        <p className="report-step-desc">Make sure everything looks good before submitting.</p>

                        {photo && (
                            <div className="review-card">
                                <div className="review-card-label">Photo</div>
                                <img src={photo} alt="Issue photo" className="review-image" />
                            </div>
                        )}

                        <div className="review-card">
                            <div className="review-card-label">Location</div>
                            <div className="review-card-value">{locationName}</div>
                        </div>

                        <div className="review-card">
                            <div className="review-card-label">Category</div>
                            <div className="review-card-value">
                                {categories.find(c => c.key === selectedCategory)?.label || 'Not selected'}
                            </div>
                        </div>

                        <div className="review-card">
                            <div className="review-card-label">Description</div>
                            <div className="review-card-value">{description || 'No description'}</div>
                        </div>

                        <div className="review-card">
                            <div className="review-card-label">Authority</div>
                            <div className="review-card-value">
                                {authorities.find(a => a.id === selectedAuthority)?.name || 'Not selected'}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation Buttons */}
            <div className="report-nav">
                {step > 1 && (
                    <button className="btn btn-secondary" onClick={handleBack}>
                        <ArrowLeft size={16} /> Back
                    </button>
                )}
                <button
                    className="btn btn-primary"
                    onClick={handleNext}
                    disabled={!canProceed()}
                    style={{
                        opacity: canProceed() ? 1 : 0.5,
                        pointerEvents: canProceed() ? 'auto' : 'none',
                    }}
                >
                    {step === TOTAL_STEPS ? (
                        <>
                            <Send size={16} /> Submit Report
                        </>
                    ) : (
                        <>
                            Next <ArrowRight size={16} />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
