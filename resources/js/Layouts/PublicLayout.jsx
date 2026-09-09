// resources/js/Layouts/PublicLayout.jsx
// Dikembalikan ke struktur normal — Navbar sticky, bukan fixed floating

import Navbar from "@/Components/Navbar/Navbar";
import Footer from "@/Components/Footer";

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}