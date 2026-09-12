<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PageItem extends Model
{
    protected $fillable = [
        'page_id',
        'type',
        'title',
        'file',
        'width',
        'sort_order',
    ];

    public function page()
    {
        return $this->belongsTo(Page::class);
    }
}
