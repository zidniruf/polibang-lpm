<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'image',
        'content',
        'event_start_date',
        'event_end_date',
        'location',
        'organizer',
        'published_at',
        'is_published',
        'show_on_home',
        'page_id',
    ];

    protected $casts = [
        'published_at' => 'datetime',
        'event_start_date' => 'date',
        'event_end_date' => 'date',
        'is_published' => 'boolean',
        'show_on_home' => 'boolean',
    ];

    public function page()
    {
        return $this->belongsTo(\App\Models\Page::class);
    }

    protected static function booted(): void
    {
        static::saving(function (Announcement $announcement) {
            if (empty($announcement->slug) && ! empty($announcement->title)) {
                $announcement->slug = \Illuminate\Support\Str::slug($announcement->title);
            }
        });

        // NOTE: pembuatan/pembaruan record Page otomatis akan ditambahkan
        // di sini (event created/updated) setelah struktur Page dikonfirmasi.
    }
}