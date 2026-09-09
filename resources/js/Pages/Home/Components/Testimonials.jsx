import { useState } from "react";

export default function Testimonials({
    testimonials = [],
}) {
    const [isPaused, setIsPaused] = useState(false);

    // Digandakan supaya animasi loop-nya nyambung mulus (seamless)
    const loopedTestimonials = [
        ...testimonials,
        ...testimonials,
    ];

    return (
        <section className="py-20 bg-slate-50 overflow-hidden">

            <style>{`
                @keyframes testimonial-marquee {
                    from {
                        transform: translateX(0);
                    }
                    to {
                        transform: translateX(-50%);
                    }
                }
            `}</style>

            <div className="max-w-7xl mx-auto px-4">

                <div className="text-center mb-12">

                    <h2 className="text-3xl lg:text-4xl font-bold">
                        Testimoni
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Pendapat dan pengalaman pengguna layanan P2M
                    </p>

                </div>

            </div>

            {testimonials.length > 0 && (

                <div
                    className="relative w-full overflow-hidden"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >

                    <div
                        className="flex gap-6 w-max px-4"
                        style={{
                            animation:
                                "testimonial-marquee 40s linear infinite",
                            animationPlayState: isPaused
                                ? "paused"
                                : "running",
                        }}
                    >

                        {loopedTestimonials.map((item, index) => (

                            <div
                                key={`${item.id}-${index}`}
                                className="
                                    bg-white
                                    rounded-2xl
                                    sm:rounded-3xl
                                    p-4
                                    sm:p-6
                                    border
                                    shadow-sm
                                    hover:shadow-lg
                                    transition
                                    flex
                                    flex-col
                                    h-full
                                    w-[220px]
                                    sm:w-[380px]
                                    shrink-0
                                "
                            >

                                <div className="mb-2 sm:mb-4 text-yellow-500 text-sm sm:text-lg">
                                    {"⭐".repeat(item.rating || 5)}
                                </div>

                                <div className="mt-3 sm:mt-6 flex items-center gap-2 sm:gap-4">

                                    {item.photo ? (

                                        <img
                                            src={`/storage/${item.photo}`}
                                            alt={item.name}
                                            className="
                                                w-10 h-10
                                                sm:w-14 sm:h-14
                                                rounded-full
                                                object-cover
                                                border
                                            "
                                        />

                                    ) : (

                                        <div
                                            className="
                                                w-10 h-10
                                                sm:w-14 sm:h-14
                                                rounded-full
                                                bg-slate-200
                                            "
                                        />
                                    )}

                                    <div>

                                        <h3 className="text-sm sm:text-base font-bold">
                                            {item.name}
                                        </h3>

                                        <p className="text-xs sm:text-sm text-gray-500">
                                            {item.position}
                                        </p>

                                    </div>

                                </div>

                                <p
                                    className="
                                        mt-3
                                        sm:mt-6
                                        text-xs
                                        sm:text-base
                                        text-gray-600
                                        leading-relaxed
                                        flex-1
                                        italic
                                        line-clamp-4
                                        sm:line-clamp-none
                                    "
                                >
                                    "{item.content}"
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            )}

        </section>
    );
}