import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, ShieldAlert, Heart, Terminal, FileText, CheckCircle2, ArrowRight } from "lucide-react";

export default function AnnouncementModal({ isOpen, onClose }) {
    const { t } = useTranslation();
    const closeBtnRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        // Prevent body scrolling while modal is open
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = originalOverflow;
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="announcement-modal-title"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(3, 4, 8, 0.88)",
                zIndex: 10000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                padding: "clamp(0.75rem, 3vw, 1.5rem)",
                boxSizing: "border-box"
            }}
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div
                className="glass-panel"
                style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "820px",
                    maxHeight: "min(92dvh, 850px)",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(212, 175, 55, 0.5)",
                    boxShadow: "0 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.15)",
                    borderRadius: "8px",
                    background: "linear-gradient(180deg, rgba(16, 17, 24, 0.96) 0%, rgba(8, 9, 14, 0.98) 100%)",
                    overflow: "hidden",
                    boxSizing: "border-box"
                }}
            >
                {/* Header */}
                <div style={{
                    padding: "clamp(1rem, 3vw, 1.5rem) clamp(1.25rem, 4vw, 2rem) clamp(0.75rem, 2vw, 1rem)",
                    borderBottom: "1px solid rgba(212, 175, 55, 0.2)",
                    background: "rgba(6, 7, 12, 0.6)",
                    position: "relative"
                }}>
                    <button
                        ref={closeBtnRef}
                        onClick={onClose}
                        aria-label={t("common.close", "Close")}
                        style={{
                            position: "absolute",
                            top: "1rem",
                            right: "1rem",
                            background: "rgba(255, 255, 255, 0.05)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            borderRadius: "4px",
                            color: "var(--text-dim)",
                            width: "36px",
                            height: "36px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.color = "#FFFFFF";
                            e.currentTarget.style.borderColor = "var(--gold)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.color = "var(--text-dim)";
                            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.1)";
                        }}
                    >
                        <X size={20} />
                    </button>

                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.45rem",
                        background: "rgba(212, 175, 55, 0.12)",
                        border: "1px solid rgba(212, 175, 55, 0.35)",
                        color: "var(--gold-bright)",
                        fontSize: "0.72rem",
                        fontFamily: "var(--font-mono)",
                        fontWeight: "bold",
                        letterSpacing: "0.5px",
                        padding: "3px 9px",
                        borderRadius: "3px",
                        marginBottom: "0.6rem"
                    }}>
                        <ShieldAlert size={14} style={{ color: "var(--gold-bright)" }} />
                        <span>{t("announcement_modal.badge")}</span>
                    </div>

                    <h2
                        id="announcement-modal-title"
                        style={{
                            fontFamily: "var(--font-hero)",
                            color: "var(--gold)",
                            margin: 0,
                            fontSize: "clamp(1.1rem, 2.8vw, 1.45rem)",
                            lineHeight: 1.35,
                            fontWeight: 700,
                            letterSpacing: "0.5px",
                            paddingRight: "2.5rem"
                        }}
                    >
                        {t("announcement_modal.title")}
                    </h2>
                </div>

                {/* Body Content */}
                <div style={{
                    padding: "clamp(1rem, 3vw, 1.75rem) clamp(1.25rem, 4vw, 2rem)",
                    overflowY: "auto",
                    overscrollBehavior: "contain",
                    color: "var(--text-secondary)",
                    fontSize: "clamp(0.85rem, 1.8vw, 0.94rem)",
                    lineHeight: 1.65,
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.25rem"
                }}>
                    {/* Intro */}
                    <div style={{
                        background: "rgba(212, 175, 55, 0.05)",
                        borderLeft: "3px solid var(--gold)",
                        padding: "0.9rem 1.1rem",
                        borderRadius: "0 4px 4px 0",
                        color: "var(--text-primary)",
                        fontSize: "clamp(0.9rem, 2vw, 0.98rem)",
                        fontWeight: 500
                    }}>
                        <p style={{ margin: 0 }}>
                            {t("announcement_modal.intro_p1")}
                        </p>
                    </div>

                    {/* Section 1 */}
                    <div>
                        <h3 style={{
                            fontFamily: "var(--font-hero)",
                            color: "var(--gold-bright)",
                            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                            margin: "0 0 0.6rem 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}>
                            <Heart size={16} style={{ color: "#ef4444" }} />
                            <span>{t("announcement_modal.sec1_title")}</span>
                        </h3>
                        <p style={{ margin: "0 0 0.6rem 0" }}>{t("announcement_modal.sec1_p1")}</p>
                        <p style={{ margin: "0 0 0.6rem 0" }}>{t("announcement_modal.sec1_p2")}</p>
                        <p style={{ margin: 0, color: "var(--text-primary)", fontWeight: 600 }}>{t("announcement_modal.sec1_p3")}</p>
                    </div>

                    {/* Section 2 */}
                    <div>
                        <h3 style={{
                            fontFamily: "var(--font-hero)",
                            color: "var(--gold-bright)",
                            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                            margin: "0 0 0.6rem 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}>
                            <Terminal size={16} style={{ color: "var(--gold)" }} />
                            <span>{t("announcement_modal.sec2_title")}</span>
                        </h3>
                        <p style={{ margin: "0 0 0.6rem 0" }}>{t("announcement_modal.sec2_p1")}</p>
                        <p style={{ margin: "0 0 0.75rem 0" }}>{t("announcement_modal.sec2_p2")}</p>
                        <p style={{ margin: "0 0 0.5rem 0", fontWeight: 600, color: "var(--text-primary)" }}>{t("announcement_modal.sec2_p3")}</p>
                        <ul style={{
                            margin: "0 0 0.75rem 0",
                            paddingLeft: "1.25rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.35rem"
                        }}>
                            <li>{t("announcement_modal.sec2_bullet1")}</li>
                            <li>{t("announcement_modal.sec2_bullet2")}</li>
                        </ul>
                        <p style={{ margin: 0, fontStyle: "italic", color: "#ff6b6b" }}>
                            {t("announcement_modal.sec2_p4")}
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div>
                        <h3 style={{
                            fontFamily: "var(--font-hero)",
                            color: "var(--gold-bright)",
                            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                            margin: "0 0 0.6rem 0",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}>
                            <FileText size={16} style={{ color: "var(--accent-teal, #4ecdc4)" }} />
                            <span>{t("announcement_modal.sec3_title")}</span>
                        </h3>
                        <p style={{ margin: "0 0 0.75rem 0" }}>{t("announcement_modal.sec3_intro")}</p>
                        
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.6rem"
                        }}>
                            <div style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "4px",
                                padding: "0.75rem 0.9rem"
                            }}>
                                <strong style={{ color: "var(--text-primary)" }}>{t("announcement_modal.sec3_bullet1_title")}</strong>: {t("announcement_modal.sec3_bullet1_desc")}
                            </div>
                            <div style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "4px",
                                padding: "0.75rem 0.9rem"
                            }}>
                                <strong style={{ color: "var(--text-primary)" }}>{t("announcement_modal.sec3_bullet2_title")}</strong>: {t("announcement_modal.sec3_bullet2_desc")}
                            </div>
                            <div style={{
                                background: "rgba(255, 255, 255, 0.02)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "4px",
                                padding: "0.75rem 0.9rem"
                            }}>
                                <strong style={{ color: "var(--text-primary)" }}>{t("announcement_modal.sec3_bullet3_title")}</strong>: {t("announcement_modal.sec3_bullet3_desc")}
                            </div>
                        </div>
                    </div>

                    {/* Section 4 */}
                    <div style={{
                        background: "rgba(6, 7, 14, 0.75)",
                        border: "1px solid rgba(212, 175, 55, 0.25)",
                        borderRadius: "6px",
                        padding: "1rem 1.25rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.6rem"
                    }}>
                        <h3 style={{
                            fontFamily: "var(--font-hero)",
                            color: "var(--gold)",
                            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
                            margin: 0,
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem"
                        }}>
                            <CheckCircle2 size={16} style={{ color: "var(--gold)" }} />
                            <span>{t("announcement_modal.sec4_title")}</span>
                        </h3>
                        <p style={{ margin: 0 }}>{t("announcement_modal.sec4_p1")}</p>
                        <p style={{ margin: 0, color: "var(--gold-bright)", fontWeight: "bold" }}>
                            {t("announcement_modal.sec4_p2")}
                        </p>
                        <p style={{ margin: 0 }}>{t("announcement_modal.sec4_p3")}</p>
                        <div style={{
                            borderTop: "1px dashed rgba(212, 175, 55, 0.25)",
                            paddingTop: "0.6rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.35rem",
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.82rem"
                        }}>
                            <p style={{ margin: 0, color: "var(--text-primary)" }}>{t("announcement_modal.sec4_cm")}</p>
                            <p style={{ margin: 0, color: "var(--gold)" }}>{t("announcement_modal.sec4_studio")}</p>
                            <p style={{ margin: 0, color: "var(--text-dim)" }}>{t("announcement_modal.sec4_thanks")}</p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div style={{
                    padding: "clamp(0.75rem, 2vw, 1.25rem) clamp(1.25rem, 4vw, 2rem)",
                    borderTop: "1px solid rgba(212, 175, 55, 0.2)",
                    background: "rgba(6, 7, 12, 0.8)",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    gap: "1rem"
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            background: "linear-gradient(135deg, var(--gold-bright) 0%, var(--gold) 100%)",
                            color: "var(--bg-void, #000000)",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.7rem 1.6rem",
                            fontFamily: "var(--font-label)",
                            fontSize: "0.88rem",
                            fontWeight: "bold",
                            letterSpacing: "0.5px",
                            cursor: "pointer",
                            boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
                            transition: "all 0.2s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = "0 0 30px rgba(212, 175, 55, 0.7)";
                            e.currentTarget.style.transform = "translateY(-1px)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = "0 0 20px rgba(212, 175, 55, 0.4)";
                            e.currentTarget.style.transform = "none";
                        }}
                    >
                        <span>{t("announcement_modal.acknowledge_btn")}</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}
