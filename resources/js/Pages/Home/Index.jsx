import { Head } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";

import Hero from "./Components/Hero";
import QuickAccess from "./Components/QuickAccess";
import LatestNews from "./Components/LatestNews";
import Announcements from "./Components/Announcements";
import AnnouncementPopup from "./Components/AnnouncementPopup";
import AboutLPM from "./Components/AboutLPM";

import Testimonials from "./Components/Testimonials";

export default function Home({
    news,
    setting,
    stats,
    announcements,
    popupAnnouncement,
    testimonials,
    documentCategories,
    documents,
}) {

    return (
        <PublicLayout setting={setting}>
            <Head>
                <title>{setting?.site_name || "P2M Polibang"}</title>
                <meta name="description" content={setting?.description || "Pusat Penjaminan Mutu Politeknik Balekambang"} />
            </Head>

            <AnnouncementPopup announcement={popupAnnouncement} />

<Hero setting={setting} />

<div className="relative z-10 -mt-20">
    <QuickAccess />
</div>

<AboutLPM setting={setting} />


<section className="py-16 bg-slate-50">

    <div className="max-w-7xl mx-auto px-4">

        <div
            className="
                grid
                lg:grid-cols-4
                gap-8
            "
        >

            <div className="lg:col-span-3">

                <LatestNews
                    news={news}
                />

            </div>

            <div className="lg:col-span-1">

                <Announcements
                    announcements={announcements}
                />

            </div>

        </div>

    </div>

</section>


<Testimonials
    testimonials={testimonials}
/>

        </PublicLayout>
    );
}