'use client';

import PublicNavbar from '@/components/PublicNavbar';
import AdminBar from '@/components/AdminBar';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';

export default function PublicLayout({ children }) {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        fetch('/api/auth/me')
            .then((res) => res.ok ? res.json() : null)
            .then((data) => {
                if (data?.authenticated && data.user?.role === 'admin') {
                    setIsAdmin(true);
                }
            })
            .catch(() => { });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {isAdmin && <AdminBar />}
            <PublicNavbar />
            <main style={{ marginTop: isAdmin ? '112px' : '80px', padding: '2rem 0', flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
}
