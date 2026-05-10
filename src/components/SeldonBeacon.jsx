import React from 'react';
import { useTranslation } from 'react-i18next';
import useSeldonBeacon from '../hooks/useSeldonBeacon';

const CLAIM_PHRASE = 'PSYCHOHISTORY-2026';

export default function SeldonBeacon() {
    const { t } = useTranslation();
    const { visible, revealed, position, reveal, dismiss } = useSeldonBeacon();

    if (!visible) return null;

    if (!revealed) {
        return (
            <button
                type="button"
                className="seldon-beacon"
                onClick={reveal}
                aria-label={t('seldon_beacon.aria_label', 'Anomalous signal detected')}
                title={t('seldon_beacon.tooltip', 'Anomalous signal...')}
                style={{
                    top: `${position.topPct}%`,
                    left: `${position.leftPct}%`,
                }}
            >
                <span className="seldon-beacon__core" aria-hidden="true" />
                <span className="seldon-beacon__pulse" aria-hidden="true" />
            </button>
        );
    }

    return (
        <div
            className="seldon-modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-labelledby="seldon-modal-title"
            onClick={dismiss}
        >
            <div
                className="seldon-modal"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="seldon-modal__scanlines" aria-hidden="true" />
                <div className="seldon-modal__header">
                    <span className="seldon-modal__tag">
                        {t('seldon_beacon.transmission_tag', 'INCOMING TRANSMISSION')}
                    </span>
                    <button
                        type="button"
                        className="seldon-modal__close"
                        onClick={dismiss}
                        aria-label={t('seldon_beacon.close', 'Close')}
                    >
                        ×
                    </button>
                </div>

                <h2 id="seldon-modal-title" className="seldon-modal__title">
                    {t('seldon_beacon.title', 'A SELDON VAULT BEACON')}
                </h2>

                <p className="seldon-modal__lead">
                    {t(
                        'seldon_beacon.lead',
                        'You intercepted a faint psychohistorical echo hidden in the Encyclopedia. Hari Seldon left a reward for the curious.'
                    )}
                </p>

                <div className="seldon-modal__divider" aria-hidden="true" />

                <p className="seldon-modal__prize-label">
                    {t('seldon_beacon.prize_label', 'REWARD')}
                </p>
                <p className="seldon-modal__prize">
                    {t('seldon_beacon.prize', '500 PLATINUM CREDITS')}
                </p>

                <p className="seldon-modal__code-label">
                    {t('seldon_beacon.code_label', 'CLAIM PHRASE')}
                </p>
                <code className="seldon-modal__code">{CLAIM_PHRASE}</code>

                <p className="seldon-modal__instructions">
                    {t(
                        'seldon_beacon.instructions',
                        'Send this phrase to HawkTuah #1061 (in-game mail or Discord) along with your alliance tag to claim your reward.'
                    )}
                </p>

                <p className="seldon-modal__footnote">
                    {t(
                        'seldon_beacon.footnote',
                        'The signal will fade on May 20, 2026. Keep it secret — only the first finder is rewarded.'
                    )}
                </p>

                <button
                    type="button"
                    className="seldon-modal__cta"
                    onClick={dismiss}
                >
                    {t('seldon_beacon.acknowledge', 'ACKNOWLEDGE')}
                </button>
            </div>
        </div>
    );
}
