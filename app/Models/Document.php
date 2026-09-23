<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Document extends Model
{
    protected $fillable = [
        'title',
        'document_category_id',
        'year',
        'type',
        'link',
        'file',
        'is_published',
    ];

    protected $casts = [
        'is_published' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(
            DocumentCategory::class,
            'document_category_id'
        );
    }

    public function pages()
    {
        return $this->belongsToMany(
            Page::class,
            'page_document'
        );
    }

    public function pageDocumentBlocks()
    {
        return $this->belongsToMany(
            PageDocumentBlock::class,
            'page_document_block_document'
        );
    }
}
