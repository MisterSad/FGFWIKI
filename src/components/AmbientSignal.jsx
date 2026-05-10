import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAmbientSignal from '../hooks/useAmbientSignal';

const K = 'sk7pq2vRm9X4tH8dN3Jc6BfL1WzY';

const dec = (s) => {
    const bin = atob(s);
    const out = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) {
        out[i] = bin.charCodeAt(i) ^ K.charCodeAt(i % K.length);
    }
    return new TextDecoder().decode(out);
};

const RAW = {
    code: 'IzhuMzl9Phs+bRdmLWUKVHwF',
    en: {
        tag: 'OiV0Pzx7OBVNbQp1Oht1LR1gAyx4',
        title: 'MktkNT12ORxNbxlhOBwYJgtyCSx4',
        lead: 'KgRCUBhcAjcfWj1EAC1cRC8TLAJfLBJsQSQDOhsEXxkCRhkgBFo5WFQtWwwhEyIKUiYDIhE+FHkHA1JQNFwVKw5VN0QRLFEFYBMCAkQrRh9UOx42HUtbFRdGVjNNSz1DFTpcRChcOENCKgNsUiIIMBweRF4=',
        label_a: 'IS5gMSN2',
        value_a: 'RlsHUCF+NwYkdw15VAtqIQp6HjA=',
        label_b: 'MCd2OTwSJho/eAtx',
        body: 'IA5ZFFFGHjseGShcBilLAW5HJUN+IxEnZSIbMVNIBkBHA1Z6BFd1UxUlXUQjUiMPFi0UbHU+CTocGVNZUVMaPQNeeEMdPFBEN1w/ERYjCiBYNhQ6FktDERYSAj1NWjRVHSUYHSFGOENEJxEtQzNU',
        note: 'JwNSUAJbETwMVXhDHSRURChSLgYWLQhsfDYDeUFbG1BDAkRkQxkTURE4GA06EzkGVTADOBG1+s1TBFkcCBICOggZPl0GO0xEKFokB1MwRiVCdwg8BApFFBRWWA==',
        cta: 'Mih8Pj5lOhcpfh0=',
        close_label: 'MAdYAxQ=',
    },
    fr: {
        tag: 'Jzl2PiJ/PwE+cBd6VA12MBxyBDdz',
        title: 'MSp7OSJ3VhYoGRR1VB53p9VnD0NyB0YfdBs+Fj0=',
        lead: 'JQRCA1FTADcXGTFaAC1KBytDPqCfYhMiETEbMBEHUlCymxU6AhkoRw0rUAsmWjkXWTAPPUQyWjoSCF+z2BISMwNKeFhTDVYHN1AmDEaBzyhYMlR5OwpFGVFhEz4JVjYUFWhUBSdAOaCfYhMiVHcImtoIWB0BVxghCBk5QQxoWxE8Wi8WTmw=',
        label_a: 'Iai+Mz5/Jhcjah0=',
        value_a: 'RlsHUDJgtdspcAxnVBh0JRp6BCY=',
        label_b: 'IyNlMSJ3VhYoGQr3/Qt0JQNyHip5DA==',
        body: 'NgVBHwhXDHIOXCxAEWhIDDxSOQYWgcZseTYNMiceVhhREUdiWwh4HBkpUQhuViRDXCcTbF4iWh0aGFQfA1ZfcgxPPVdUPlcQPFZqF1clRigWNhY1GgpZExQSBj0YS3hGt+FbCC9eLxEWNAk4QzJaK7DCVB8cQhM8Hlx2',
        note: 'Pw4XAxhVGDMBGSsTt+FMASddLhFXYgopEWVKeR4KXlBDAkRkQxkfVQYsXR5jXy9DRScFPlQjWrvz/xcDFEcaN01VORQEOl0JJ/DiEVNiFilDJBU3HQ4Xs9ESGjdNXZudFydNEjxaOENFJxQtESW58BAEWgAUXAWRxFx2',
        cta: 'Iai+MzRiIhsidxb3/Q==',
        close_label: 'NQ5FHRRA',
    },
};

export default function AmbientSignal() {
    const { i18n } = useTranslation();
    const { visible, position, hide } = useAmbientSignal();
    const [revealed, setRevealed] = useState(false);

    const payload = useMemo(() => {
        if (!revealed) return null;
        const lang = (i18n.language || 'en').split('-')[0];
        const localized = RAW[lang] || RAW.en;
        const decoded = { code: dec(RAW.code) };
        for (const [k, v] of Object.entries(localized)) {
            decoded[k] = dec(v);
        }
        return decoded;
    }, [revealed, i18n.language]);

    if (!visible) return null;

    const close = () => {
        setRevealed(false);
        hide();
    };

    if (!revealed) {
        return (
            <button
                type="button"
                className="amb-dot"
                onClick={() => setRevealed(true)}
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
                        aria-label={payload.close_label}
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
