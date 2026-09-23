import { Head, Link } from "@inertiajs/react";
import PublicLayout from "@/Layouts/PublicLayout";
import { Download } from "lucide-react";

export default function Show({
    page,
    organizationMembers = [],
}) {
    return (
        <PublicLayout>
            <Head title={page.title} />

            {page.banner_image ? (

                <div className="relative w-full h-[280px] md:h-[380px] overflow-hidden">

                    <img
                        src={`/storage/${page.banner_image}`}
                        alt={page.title}
                        className="
                            absolute
                            inset-0
                            w-full
                            h-full
                            object-cover
                        "
                    />

                    <div className="absolute inset-0 bg-black/55" />

                    <div
                        className="
                            relative
                            z-10
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            text-center
                            px-4
                        "
                    >
                        <h1
                            className="
                                text-white
                                text-3xl
                                md:text-5xl
                                font-serif
                                mb-4
                            "
                        >
                            {page.title}
                        </h1>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                                text-white/90
                                text-sm
                            "
                        >
                            <Link
                                href="/"
                                className="hover:underline"
                            >
                                Home
                            </Link>

                            <span>&rsaquo;</span>

                            <span>{page.title}</span>
                        </div>
                    </div>

                </div>

            ) : (

                <div className="max-w-5xl mx-auto px-4 pt-16">

                    <h1 className="text-4xl font-bold mb-8">
                        {page.title}
                    </h1>

                </div>

            )}

            <div className="max-w-5xl mx-auto px-4 py-16">


{/* Isi Halaman */}
{page.content && (
    <div
        className="
            prose
            prose-lg
            max-w-none
            text-gray-700
            prose-headings:font-bold
            prose-headings:text-gray-900
            prose-h1:text-4xl
            prose-h2:text-3xl
            prose-h3:text-2xl
            prose-p:leading-7
            prose-blockquote:border-l-4
            prose-blockquote:border-green-600
            prose-blockquote:pl-4
            prose-blockquote:italic
            prose-ul:list-disc
            prose-ol:list-decimal
            prose-li:my-1
            prose-a:text-blue-600
            prose-a:underline
            prose-img:rounded-xl
            prose-img:shadow
            prose-img:max-w-full
        "
        dangerouslySetInnerHTML={{
            __html: page.content || "",
        }}
    />
)}


                {page.show_structure &&
    organizationMembers.length > 0 && (

    <div className="mt-16">

        <h2 className="text-3xl font-bold mb-8">
            Struktur Organisasi
        </h2>

        <div className="space-y-8">

            {organizationMembers.map((member) => (

                <div
                    key={member.id}
                    className="
                        border
                        rounded-2xl
                        p-6
                        grid
                        md:grid-cols-[250px_1fr]
                        gap-6
                    "
                >

                    <div>

                        {member.photo && (

                            <img
                                src={`/storage/${member.photo}`}
                                alt={member.name}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                "
                            />

                        )}

                    </div>

                    <div>

                        <h3 className="text-2xl font-bold mb-4">
                            {member.position}
                        </h3>

<table className="w-full">
    <tbody>
        {/* Nama - wajib */}
        <tr>
            <td className="font-semibold py-2 w-36">
                Nama
            </td>
            <td className="py-2 w-4">:</td>
            <td>{member.name}</td>
        </tr>

        {/* NIY - opsional */}
        {member.niy?.trim() && (
            <tr>
                <td className="font-semibold py-2">
                    NIY
                </td>
                <td className="py-2">:</td>
                <td>{member.niy}</td>
            </tr>
        )}

        {/* NIDN/NUPTK - opsional */}
        {member.nidn_nuptk?.trim() && (
            <tr>
                <td className="font-semibold py-2">
                    NIDN/NUPTK
                </td>
                <td className="py-2">:</td>
                <td>{member.nidn_nuptk}</td>
            </tr>
        )}

        {/* Jabatan - wajib */}
        <tr>
            <td className="font-semibold py-2">
                Jabatan
            </td>
            <td className="py-2">:</td>
            <td>{member.position}</td>
        </tr>

        {/* Gmail - opsional */}
        {member.email?.trim() && (
            <tr>
                <td className="font-semibold py-2">
                    Gmail
                </td>
                <td className="py-2">:</td>
                <td>{member.email}</td>
            </tr>
        )}
    </tbody>
</table>

{/* Description - opsional */}
{member.description?.trim() && (
    <div
        className="mt-4 prose"
        dangerouslySetInnerHTML={{
            __html: member.description,
        }}
    />
)}

                    </div>

                </div>

            ))}

        </div>

    </div>

)}


{/* Blok Dokumen */}

{page.document_blocks?.length > 0 && (

    <div className="mt-16 space-y-12">

        {page.document_blocks.map((block) => (

            <div key={block.id}>

                <div
                    className="
                        text-2xl
                        font-bold
                        mb-6
                    "
                >
                    {block.title}
                </div>

                {/* Versi mobile: tabel */}
                <div className="block sm:hidden overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b text-[10px] text-gray-500 uppercase tracking-wider">
                                <th className="text-left py-2 w-8">No</th>
                                <th className="text-left py-2">Nama Dokumen</th>
                                <th className="text-center py-2 w-10">Unduh</th>
                            </tr>
                        </thead>
                        <tbody>
                            {block.documents?.map((doc, index) => (
                                <tr key={doc.id} className="border-b">
                                    <td className="py-3 text-xs text-gray-400 font-medium">
                                        {index + 1}
                                    </td>
                                    <td className="py-3">
                                        <a
                                            href={doc.type === 'link' ? doc.link : `/storage/${doc.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-700 text-sm font-medium leading-tight break-words"
                                        >
                                            {doc.title}
                                        </a>
                                    </td>
                                    <td className="py-3 text-center">
                                        <a
                                            href={doc.type === 'link' ? doc.link : `/storage/${doc.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={doc.type === 'file'}
                                            className="inline-flex items-center justify-center bg-blue-600 text-white w-8 h-8 rounded-lg hover:bg-blue-700 transition-colors"
                                            title="UNDUH DOKUMEN"
                                        >
                                            <Download size={16} />
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Versi desktop: tabel */}
                <div className="hidden sm:block overflow-x-auto">

                    <table className="w-full border-collapse">

                        <thead>

                            <tr className="border-b">

                                <th className="text-left py-3 w-20">
                                    No
                                </th>

                                <th className="text-left py-3">
                                    Nama Dokumen
                                </th>

                                <th className="text-left py-3 w-56">
                                    Download
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {block.documents?.map((doc, index) => (

                                <tr
                                    key={doc.id}
                                    className="border-b"
                                >

                                    <td className="py-4">
                                        {index + 1}
                                    </td>

                                    <td className="py-4">

                                        <a
                                            href={doc.type === 'link' ? doc.link : `/storage/${doc.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="
                                                text-blue-700
                                                hover:underline
                                            "
                                        >
                                            {doc.title}
                                        </a>

                                    </td>

                                    <td className="py-4">

                                        <a
                                            href={doc.type === 'link' ? doc.link : `/storage/${doc.file}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            download={doc.type === 'file'}
                                            className="
                                                inline-block
                                                bg-blue-600
                                                text-white
                                                px-5
                                                py-2
                                                rounded-lg
                                                hover:bg-blue-700
                                            "
                                        >
                                            UNDUH DOKUMEN
                                        </a>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        ))}

    </div>

)}

{/* Blok Galeri */}

{page.gallery_blocks?.length > 0 && (

    <div className="mt-16 space-y-12">

        {page.gallery_blocks.map((block) => (

            <div key={block.id}>

                <div
                    className="
                        inline-block
                        bg-blue-600
                        text-white
                        font-bold
                        px-6
                        py-3
                        rounded
                        mb-6
                    "
                >
                    {block.title}
                </div>

                {block.galleries?.length > 0 ? (

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                        "
                    >

                        {block.galleries.map((gallery) => (

                            <a
                                key={gallery.id}
                                href={`/storage/${gallery.image}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    border
                                    rounded-xl
                                    overflow-hidden
                                    hover:shadow-lg
                                    transition
                                "
                            >

                                <img
                                    src={`/storage/${gallery.image}`}
                                    alt={gallery.title}
                                    className="
                                        w-full
                                        h-56
                                        object-cover
                                    "
                                />

                                <div className="p-4">

                                    <div className="font-semibold">
                                        {gallery.title}
                                    </div>

                                    {gallery.description && (

                                        <div
                                            className="
                                                text-sm
                                                text-gray-500
                                                mt-2
                                            "
                                        >
                                            {gallery.description}
                                        </div>

                                    )}

                                </div>

                            </a>

                        ))}

                    </div>

                ) : (

                    <div className="text-gray-500">
                        Tidak ada galeri.
                    </div>

                )}

            </div>

        ))}

    </div>

)}

            </div>

        </PublicLayout>
    );
}