<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageDocumentBlock extends Model
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

    public function documents()
    {
        return $this->belongsToMany(
            Document::class,
            'page_document_block_document'
        );
    }
}