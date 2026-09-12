<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Mews\Purifier\Facades\Purifier;

class Page extends Model
{
    protected static function booted()
    {
        static::saving(function ($page) {
            if ($page->isDirty('content')) {
                $page->content = Purifier::clean($page->content);
            }
        });
    }

    protected $fillable = [
        'title',
        'slug',
        'content',
        'banner_image',
        'menu_group_id',
        'sort_order',
        'is_published',

        'show_documents',
        'show_gallery',
        'show_structure',
    ];

    protected $casts = [
        'is_published' => 'boolean',

        'show_documents' => 'boolean',
        'show_gallery' => 'boolean',
        'show_structure' => 'boolean',
    ];

    public function menuGroup()
    {
        return $this->belongsTo(MenuGroup::class);
    }

    public function documents()
    {
        return $this->belongsToMany(
            Document::class,
            'page_document'
        );
    }

    public function documentBlocks()
    {
        return $this->hasMany(
            PageDocumentBlock::class
        )->orderBy('sort_order');
    }

    public function galleryBlocks()
    {
        return $this->hasMany(
            PageGalleryBlock::class
        )->orderBy('sort_order');
    }
}
