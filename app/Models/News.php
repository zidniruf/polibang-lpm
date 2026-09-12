<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mews\Purifier\Facades\Purifier;

class News extends Model
{
    protected static function booted()
    {
        static::saving(function ($news) {
            if ($news->isDirty('content')) {
                $news->content = Purifier::clean($news->content);
            }
        });
    }

    protected $fillable = [
        'news_category_id',
        'title',
        'slug',
        'excerpt',
        'content',
        'thumbnail',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(
            NewsCategory::class,
            'news_category_id'
        );
    }
}
