import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function Header({ isMuted, toggleMute }) {
    return (
        <header className="sticky-nav header-container">
            <div className="header-text-wrapper">
                <div className="header-title-main">
                    FOUNDATION
                </div>
                <div className="header-title-light">
                    GALACTIC FRONTIER
                </div>
                <div className="header-subtitle">
                    Encyclopedia Galactica
                </div>
            </div>
            <button
                onClick={toggleMute}
                className="mute-button"
                aria-label={isMuted ? "Unmute background music" : "Mute background music"}
                title={isMuted ? "Unmute background music" : "Mute background music"}
            >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
        </header>
    );
}
