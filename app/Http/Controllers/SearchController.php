<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Document;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    /**
     * Menangani GET /search?q=kata-kunci -> halaman hasil pencarian penuh.
     */
    public function index(Request $request)
    {
        $query = trim((string) $request->query('q', ''));

        return Inertia::render('Search/Index', [
            'query'   => $query,
            'results' => $this->buildResults($query, 10),
        ]);
    }

    /**
     * Menangani GET /search/suggest?q=kata-kunci -> dropdown saran ketik (JSON, dipanggil via fetch dari Navbar).
     * Dibatasi lebih sedikit (4 per kategori) supaya cepat dan ringan.
     */
    public function suggest(Request $request)
    {
        $query = trim((string) $request->query('q', ''));

        return response()->json([
            'query'   => $query,
            'results' => $this->buildResults($query, 4),
        ]);
    }

    /**
     * Logika pencarian utama, dipakai bersama oleh index() dan suggest().
     *
     * PENTING: sesuaikan nama kolom ('title', 'content') di bawah
     * dengan kolom asli pada masing-masing migration/model kamu kalau berbeda.
     */
    private function buildResults(string $query, int $limit): array
    {
        $results = [
            'news'          => [],
            'documents'     => [],
            'pages'         => [],
            'announcements' => [],
            'galleries'     => [],
        ];

        if ($query === '') {
            return $results;
        }

        $term = '%' . $query . '%';

        // News dicocokkan ke title ATAU content, jadi dibungkus closure
        // supaya tidak mematahkan filter is_published di sebelahnya.
        $results['news'] = News::query()
            ->where('is_published', true)
            ->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('content', 'like', $term);
            })
            ->latest('published_at')
            ->limit($limit)
            ->get(['id', 'title', 'slug']);

        $results['documents'] = Document::query()
            ->where('is_published', true)
            ->where('title', 'like', $term)
            ->orderBy('title')
            ->limit($limit)
            ->get(['id', 'title']);

        $results['pages'] = Page::query()
            ->where('is_published', true)
            ->where('title', 'like', $term)
            ->limit($limit)
            ->get(['id', 'title', 'slug']);

        $results['announcements'] = Announcement::query()
            ->where('is_published', true)
            ->where('title', 'like', $term)
            ->latest()
            ->limit($limit)
            ->get(['id', 'title']);

        $results['galleries'] = Gallery::query()
            ->where('is_published', true)
            ->where('title', 'like', $term)
            ->orderBy('sort_order')
            ->limit($limit)
            ->get(['id', 'title']);

        return $results;
    }
}