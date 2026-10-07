<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuickAccessItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            ['name' => 'Dokumen Mutu', 'type' => 'checkbox', 'display_on_frontend' => true, 'order' => 1, 'icon' => 'file-text'],
            ['name' => 'Berita', 'type' => 'checkbox', 'display_on_frontend' => true, 'order' => 2, 'icon' => 'newspaper'],
            ['name' => 'Pengumuman', 'type' => 'checkbox', 'display_on_frontend' => true, 'order' => 3, 'icon' => 'megaphone'],
            ['name' => 'Gallery', 'type' => 'checkbox', 'display_on_frontend' => true, 'order' => 4, 'icon' => 'images'],
            ['name' => 'PDDIKT', 'type' => 'link', 'display_on_frontend' => true, 'link' => '#', 'order' => 5, 'icon' => 'link'],
            ['name' => 'Akreditasi', 'type' => 'link', 'display_on_frontend' => true, 'link' => '#', 'order' => 6, 'icon' => 'award'],
        ];

        foreach ($items as $item) {
            \App\Models\QuickAccessItem::create($item);
        }
    }
}
