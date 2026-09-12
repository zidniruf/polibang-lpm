<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageGalleryBlock extends Model
{
    protected $fillable = [
        'page_id',
        'title',
        'filter_type',
        'filter_value',
        'sort_order',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }

    public function galleries()
    {
        return $this->belongsToMany(
            Gallery::class,
            'page_gallery_block_gallery'
        );
    }
}
