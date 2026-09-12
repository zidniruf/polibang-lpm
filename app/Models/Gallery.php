<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'gallery_category_id',
        'title',
        'image',
        'description',
        'sort_order',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(
            GalleryCategory::class,
            'gallery_category_id'
        );
    }
}
