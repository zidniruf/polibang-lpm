<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NavigationLink extends Model
{
    protected $fillable = [
        'title',
        'url',
        'sort_order',
        'is_active',
        'parent_id',
        'menu_group_id',
    ];

    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

    public function children()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    public function menuGroup()
    {
        return $this->belongsTo(MenuGroup::class);
    }

    public function pages()
    {
        return $this->hasMany(Page::class);
    }

    protected $casts = [
        'is_active' => 'boolean',
    ];
}
