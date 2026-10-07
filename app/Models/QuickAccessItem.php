<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuickAccessItem extends Model
{
    protected $fillable = [
        'name',
        'description',
        'type',
        'display_on_frontend',
        'link',
        'order',
        'icon',
    ];

    protected $casts = [
        'display_on_frontend' => 'boolean',
    ];
}
