<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Mews\Purifier\Facades\Purifier;

class Announcement extends Model
{
protected $fillable = [
    'title',
    'slug',
    'content',
    'image',
    'published_at',
    'event_start_date',
    'event_end_date',
    'location',
    'organizer',
    'is_published',
    'show_on_home',
];

    protected static function booted(): void
    {
        static::saving(function (Announcement $announcement) {
            if ($announcement->isDirty('content')) {
                $announcement->content = Purifier::clean($announcement->content);
            }

            if (empty($announcement->slug) && ! empty($announcement->title)) {
                $announcement->slug = Str::slug($announcement->title);
            }
        });

        // NOTE: pembaruan record Page otomatis akan ditambahkan
        // di sini (event created/updated) setelah struktur Page dikonfirmasi.
    }
}