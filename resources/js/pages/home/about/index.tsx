import { HomeLayout } from '@/layouts/home-layout';
import { Head } from '@inertiajs/react';

export default function AboutPage() {
    return (
        <HomeLayout>
            <Head title="Tentang Kami" />
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                <div className="mx-auto max-w-7xl space-y-12 p-6">
                    {/* Header */}
                    <header className="space-y-2 text-center">
                        <h1 className="text-4xl font-bold text-gray-800">Tentang Kami</h1>
                        <p className="text-gray-600">Kenali sejarah, visi misi, dan tim kami</p>
                    </header>

                    {/* Sejarah Singkat */}
                    <section className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
                        <h2 className="border-l-4 border-blue-500 pl-3 text-2xl font-semibold text-gray-800">Sejarah Singkat</h2>
                        <p className="leading-relaxed text-gray-700">
                            Yayasan kami didirikan pada tahun 2010 dengan tujuan membantu anak-anak yatim dan dhuafa. Berawal dari komunitas kecil,
                            kini kami telah memiliki program pendidikan, sosial, dan pemberdayaan masyarakat yang tersebar di berbagai wilayah.
                        </p>
                    </section>

                    {/* Visi & Misi */}
                    <section className="space-y-6 rounded-2xl bg-white p-6 shadow-md">
                        <h2 className="border-l-4 border-green-500 pl-3 text-2xl font-semibold text-gray-800">Visi & Misi</h2>
                        <div className="grid gap-6 md:grid-cols-2">
                            <div className="rounded-xl bg-green-50 p-4 shadow-sm">
                                <h3 className="mb-2 text-xl font-medium text-green-800">Visi</h3>
                                <p className="leading-relaxed text-gray-700">
                                    Menjadi lembaga sosial terpercaya yang berkontribusi nyata dalam meningkatkan kualitas pendidikan dan
                                    kesejahteraan anak-anak yatim di Indonesia.
                                </p>
                            </div>
                            <div className="rounded-xl bg-blue-50 p-4 shadow-sm">
                                <h3 className="mb-2 text-xl font-medium text-blue-800">Misi</h3>
                                <ul className="list-inside list-disc space-y-1 text-gray-700">
                                    <li>Menyediakan akses pendidikan berkualitas untuk anak-anak yatim dan dhuafa.</li>
                                    <li>Menyelenggarakan program sosial dan pemberdayaan masyarakat.</li>
                                    <li>Membangun kolaborasi dengan berbagai pihak untuk keberlanjutan program.</li>
                                    <li>Meningkatkan kesadaran masyarakat tentang pentingnya berbagi dan peduli.</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Struktur Organisasi */}
                    <section className="space-y-4 rounded-2xl bg-white p-6 shadow-md">
                        <h2 className="border-l-4 border-purple-500 pl-3 text-2xl font-semibold text-gray-800">Struktur Organisasi</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full overflow-hidden rounded-lg border border-gray-200">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border-b px-4 py-2 text-left">Jabatan</th>
                                        <th className="border-b px-4 py-2 text-left">Nama</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        <td className="px-4 py-2">Ketua Yayasan</td>
                                        <td className="px-4 py-2">Ahmad Fauzi</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Sekretaris</td>
                                        <td className="px-4 py-2">Siti Nurhaliza</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Bendahara</td>
                                        <td className="px-4 py-2">Rizki Pratama</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-2">Koordinator Program</td>
                                        <td className="px-4 py-2">Lina Marlina</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </HomeLayout>
    );
}
