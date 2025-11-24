'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import providers from '@/data/providers.json';

type UserData = {
    orbtId: string;
    providers: Partial<Record<keyof typeof providers, string>>;
};

interface UserContextType {
    user: UserData | null;
    loading: boolean;
    refetch: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/user');
            const data = await res.json();

            let providers = { ...data };
            delete providers.orbtId;

            setUser({
                orbtId: data.orbtId,
                providers: providers,
            });
        } catch (error) {
            console.error('Failed to fetch user data:', error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return <UserContext.Provider value={{ user, loading, refetch: fetchUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
