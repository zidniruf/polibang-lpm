<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class DocumentCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    protected static function booted()
    {
        static::saving(function ($category) {
            $category->slug = Str::slug($category->name);
        });
    }

    public function documents()
    {
        return $this->hasMany(
            Document::class,
            'document_category_id'
        );
    }
}
