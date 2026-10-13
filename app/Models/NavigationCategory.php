<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class NavigationCategory extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'menu_group_id',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'menu_group_id' => 'integer',
            'sort_order' => 'integer',
        ];
    }

    protected static function booted(): void
    {
        static::saving(function (NavigationCategory $category) {
            $category->slug = Str::slug($category->name);
        });
    }

    public function menuGroup()
    {
        return $this->belongsTo(MenuGroup::class);
    }

    public function pages()
    {
        return $this->hasMany(Page::class, 'navigation_category_id');
    }
}