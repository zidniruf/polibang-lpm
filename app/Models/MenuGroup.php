<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class MenuGroup extends Model
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
        static::saving(function ($group) {
            $group->slug = Str::slug($group->name);
        });
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    public function documents()
{
    return $this->hasMany(Document::class);
}
}