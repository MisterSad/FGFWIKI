import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'fgf_user_favorites_v1';

export default function useFavorites() {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : { champions: [], guides: [], decks: [] };
        } catch {
            return { champions: [], guides: [], decks: [] };
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
        } catch (e) {
            console.error('Failed to save favorites to localStorage', e);
        }
    }, [favorites]);

    const isFavorite = useCallback((type, id) => {
        const list = favorites[type] || [];
        return list.includes(String(id));
    }, [favorites]);

    const toggleFavorite = useCallback((type, id) => {
        const strId = String(id);
        setFavorites((prev) => {
            const currentList = prev[type] || [];
            const exists = currentList.includes(strId);
            const updated = exists
                ? currentList.filter((item) => item !== strId)
                : [...currentList, strId];
            return {
                ...prev,
                [type]: updated,
            };
        });
    }, []);

    return {
        favorites,
        isFavorite,
        toggleFavorite,
    };
}
