<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use App\Models\Announcement;
use App\Models\Document;
use App\Models\Gallery;
use App\Models\GalleryCategory;
use App\Models\News;
use App\Models\OrganizationMember;
use App\Models\Page;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HomeController::class, 'index']);

Route::get('/search/suggest', [SearchController::class, 'suggest'])->name('search.suggest');
Route::get('/search', [SearchController::class, 'index'])->name('search');

Route::get('/halaman/{slug}', function ($slug) {

    $page = Page::with([
        'documentBlocks',
        'documentBlocks.documents',
        'galleryBlocks',
    ])
        ->where('slug', $slug)
        ->where('is_published', true)
        ->firstOrFail();

    $page->documentBlocks->each(function ($block) {

        if ($block->filter_type === 'category') {

            $documents = Document::query()
                ->where('document_category_id', $block->filter_value)
                ->where('is_published', true)
                ->orderBy('title')
                ->get();

            $block->setRelation('documents', $documents);
        }

        if ($block->filter_type === 'year') {

            $documents = Document::query()
                ->where('year', $block->filter_value)
                ->where('is_published', true)
                ->orderBy('title')
                ->get();

            $block->setRelation('documents', $documents);
        }

    });

    $page->galleryBlocks->each(function ($block) {

        $galleries = collect();

        if ($block->filter_type === 'category') {

            $galleries = Gallery::query()
                ->where(
                    'gallery_category_id',
                    $block->filter_value
                )
                ->where('is_published', true)
                ->orderBy('sort_order')
                ->get();
        }

        if ($block->filter_type === 'gallery') {

            $galleries = Gallery::query()
                ->where('id', $block->filter_value)
                ->where('is_published', true)
                ->get();
        }

        $block->setRelation(
            'galleries',
            $galleries
        );

    });

    return Inertia::render('Page/Show', [
        'page' => $page,

        'organizationMembers' => $page->show_structure
                ? OrganizationMember::query()
                    ->where('is_active', true)
                    ->orderBy('sort_order')
                    ->get()
                : [],
    ]);

});

Route::get('/profil', function () {

    $page = Page::where('slug', 'profil')
        ->where('is_published', true)
        ->firstOrFail();

    return Inertia::render('Page/Show', [
        'page' => $page,
    ]);

});

Route::get('/spmi', function () {

    $page = Page::where('slug', 'spmi')
        ->where('is_published', true)
        ->firstOrFail();

    return Inertia::render('Page/Show', [
        'page' => $page,
    ]);

});

Route::get('/kontak', function () {

    $page = Page::where('slug', 'kontak')
        ->where('is_published', true)
        ->firstOrFail();

    return Inertia::render('Page/Show', [
        'page' => $page,
    ]);

});

Route::get('/dokumen', function () {

    $documents = Document::query()
        ->where('is_published', true)
        ->latest()
        ->get();

    return Inertia::render('Documents/Index', [
        'documents' => $documents,
    ]);

});

Route::get('/pengumuman/{slug}', function ($slug) {

    $announcement = Announcement::query()
        ->where('slug', $slug)
        ->where('is_published', true)
        ->firstOrFail();

    return Inertia::render('Announcements/Show', [
        'announcement' => $announcement,
    ]);
});

Route::get('/berita/{slug}', function ($slug) {

    $news = News::where('slug', $slug)
        ->where('is_published', true)
        ->firstOrFail();

    $relatedNews = News::where('id', '!=', $news->id)
        ->where('is_published', true)
        ->latest('published_at')
        ->take(3)
        ->get();

    return Inertia::render('News/Show', [
        'news' => $news,
        'relatedNews' => $relatedNews,
    ]);
});

Route::get('/berita', function () {

    $news = News::where('is_published', true)
        ->latest('published_at')
        ->paginate(9);

    return Inertia::render('News/Index', [
        'news' => $news,
    ]);

});

Route::get('/pengumuman', function () {

    $announcements = Announcement::query()
        ->where('is_published', true)
        ->latest()
        ->paginate(10);

    return Inertia::render(
        'Announcements/Index',
        [
            'announcements' => $announcements,
        ]
    );
});

Route::get('/galeri', function () {

    $galleries = Gallery::query()
        ->where('is_published', true)
        ->latest()
        ->paginate(12);

    return Inertia::render(
        'Galleries/Index',
        [
            'galleries' => $galleries,
        ]
    );
});

Route::get('/galeri', function () {

    $categories = GalleryCategory::query()
        ->with(['galleries' => function ($query) {
            $query
                ->where('is_published', true)
                ->orderBy('sort_order');
        }])
        ->get()
        ->filter(fn ($category) => $category->galleries->count() > 0)
        ->values();

    return Inertia::render('Galleries/Index', [
        'categories' => $categories,
    ]);
});

require __DIR__.'/sitemap.php';
require __DIR__.'/auth.php';
