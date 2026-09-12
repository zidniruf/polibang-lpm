<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Document;
use App\Models\Gallery;
use App\Models\News;
use App\Models\Testimonial;
use App\Models\WebsiteSetting;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Index', [

            'setting' => WebsiteSetting::first(),

            'news' => News::query()
                ->where('is_published', true)
                ->latest('published_at')
                ->take(6)
                ->get(),

            'announcements' => Announcement::query()
                ->where('is_published', true)
                ->latest()
                ->take(5)
                ->get(),

            'popupAnnouncement' => Announcement::query()
                ->where('is_published', true)
                ->where('show_on_home', true)
                ->latest('published_at')
                ->first(),

            'testimonials' => Testimonial::query()
                ->where('is_active', true)
                ->latest()
                ->take(10)
                ->get(),

            'featuredDocuments' => Document::query()
                ->where('is_published', true)
                ->latest()
                ->take(12)
                ->get(),

            'documents' => Document::query()
                ->with('category')
                ->where('is_published', true)
                ->latest()
                ->take(20)
                ->get(),

            'galleries' => Gallery::query()
                ->where('is_published', true)
                ->latest()
                ->take(8)
                ->get(),

            'stats' => [
                'documents' => Document::count(),
                'news' => News::count(),
                'galleries' => Gallery::count(),
                'announcements' => Announcement::count(),
            ],

        ]);
    }
}
