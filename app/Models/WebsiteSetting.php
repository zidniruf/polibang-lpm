<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WebsiteSetting extends Model
{
    protected $fillable = [

        'site_name',
        'logo',
        'favicon',

        'hero_title',
        'hero_subtitle',

        'hero_image_1',
        'hero_image_2',

        // About
        'about_title',
        'about_content',
        'about_image',

        'email',
        'phone',
        'address',
        'whatsapp',

        'instagram',
        'facebook',
        'youtube',
        'tiktok',
    ];
}
