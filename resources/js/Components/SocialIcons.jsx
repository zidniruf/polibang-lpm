// resources/js/Components/SocialIcons.jsx
import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa6";

const SOCIALS = [
    { key: "instagram", icon: FaInstagram, label: "Instagram" },
    { key: "facebook",  icon: FaFacebook,  label: "Facebook"  },
    { key: "youtube",   icon: FaYoutube,   label: "YouTube"   },
    { key: "tiktok",    icon: FaTiktok,    label: "TikTok"    },
];

/**
 * Ikon sosial media yang otomatis mengikuti data WebsiteSetting di admin.
 * Kalau field instagram/facebook/youtube/tiktok kosong di database,
 * ikonnya otomatis tidak tampil — tidak perlu hardcode di komponen mana pun.
 *
 * variant="icon"    -> hanya bulatan ikon (dipakai di Navbar)
 * variant="labeled" -> ikon + teks label (dipakai di Footer)
 */
export default function SocialIcons({ setting, variant = "icon", className = "", iconSize = 16 }) {
    const active = SOCIALS.filter((s) => setting?.[s.key]);
    if (!active.length) return null;

    if (variant === "labeled") {
        return (
            <div className={`space-y-2 ${className}`}>
                {active.map(({ key, icon: Icon, label }) => (
                    <a
                        key={key}
                        href={setting[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <Icon size={iconSize} />
                        <span>{label}</span>
                    </a>
                ))}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            {active.map(({ key, icon: Icon, label }) => (
                <a
                    key={key}
                    href={setting[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="text-gray-400 hover:text-blue-600 transition-colors"
                >
                    <Icon size={iconSize} />
                </a>
            ))}
        </div>
    );
}