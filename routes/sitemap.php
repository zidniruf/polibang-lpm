<?php

use Illuminate\Support\Facades\Route;
use App\Models\News;
use App\Models\Announcement;
use App\Models\Page;
use App\Models\Document;
use App\Models\Gallery;

Route::get('/sitemap.xml', function () {
    $urls = collect();

    // Pages
    Page::where('is_published', true)->get()->each(function ($page) use ($urls) {
        $urls->push(url('/halaman/' . $page->slug));
    });

    // News
    News::where('is_published', true)->get()->each(function ($news) use ($urls) {
        $urls->push(url('/berita/' . $news->slug));
    });

    // Announcements
    Announcement::where('is_published', true)->get()->each(function ($announcement) use ($urls) {
        $urls->push(url('/pengumuman/' . $announcement->slug));
    });

    return response()->view('sitemap', ['urls' => $urls])
        ->header('Content-Type', 'text/xml');
});
