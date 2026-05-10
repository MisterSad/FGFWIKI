import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';
import { db } from '../firebase';
import useAmbientSignal from '../hooks/useAmbientSignal';

export default function AmbientSignal() {
    const { i18n } = useTranslation();
    const { visible, position, hide } = useAmbientSignal();
    const [revealed, setRevealed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(null);

    if (!visible) return null;

    const close = () => {
        setRevealed(false);
        setPayload(null);
        hide();
    };

    const handleClick = async () => {
        if (loading) return;
        if (!db) {
            hide();
            return;
        }
        setLoading(true);
        try {
            const snap = await getDoc(doc(db, 'system', 'event_payload'));
            if (!snap.exists()) {
                hide();
                return;
            }
            const data = snap.data();
            const lang = (i18n.language || 'en').split('-')[0];
            const localized = (data.i18n && (data.i18n[lang] || data.i18n.en)) || {};
            setPayload({ ...localized, code: data.code });
            setRevealed(true);
        } catch {
            hide();
        } finally {
            setLoading(false);
        }
    };

    if (!revealed) {
        return (
            <button
                type="button"
                className="amb-dot"
                onClick={handleClick}
                disabled={loading}
                aria-label="Notification"
                style={{
                    top: `${position.topPct}%`,
                    left: `${position.leftPct}%`,
                }}
            >
                <span className="amb-dot__core" aria-hidden="true" />
                <span className="amb-dot__pulse" aria-hidden="true" />
            </button>
        );
    }

    if (!payload) return null;

    return (
        <div
            className="amb-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="amb-modal-title"
            onClick={close}
        >
            <div className="amb-modal" onClick={(e) => e.stopPropagation()}>
                <div className="amb-modal__scanlines" aria-hidden="true" />
                <div className="amb-modal__header">
                    <span className="amb-modal__tag">{payload.tag}</span>
                    <button
                        type="button"
                        className="amb-modal__close"
                        onClick={close}
                        aria-label={payload.close_label || 'Close'}
                    >
                        ×
                    </button>
                </div>

                <h2 id="amb-modal-title" className="amb-modal__title">{payload.title}</h2>
                <p className="amb-modal__lead">{payload.lead}</p>

                <div className="amb-modal__divider" aria-hidden="true" />

                <p className="amb-modal__a-label">{payload.label_a}</p>
                <p className="amb-modal__a-value">{payload.value_a}</p>

                <p className="amb-modal__b-label">{payload.label_b}</p>
                <code className="amb-modal__b-value">{payload.code}</code>

                <p className="amb-modal__instructions">{payload.body}</p>
                <p className="amb-modal__footnote">{payload.note}</p>

                <button type="button" className="amb-modal__cta" onClick={close}>
                    {payload.cta}
                </button>
            </div>
        </div>
    );
}
