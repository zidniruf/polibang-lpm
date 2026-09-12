<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('announcements', function (Blueprint $table) {

            // Menampilkan pengumuman sebagai popup saat homepage pertama kali dibuka
            $table->boolean('show_on_home')
                ->default(false)
                ->after('is_published');

            // 4 kolom informasi yang tampil di halaman detail pengumuman
            $table->date('event_start_date')
                ->nullable()
                ->after('content');

            $table->date('event_end_date')
                ->nullable()
                ->after('event_start_date');

            $table->string('location')
                ->nullable()
                ->after('event_end_date');

            $table->string('organizer')
                ->nullable()
                ->after('location');

            // Relasi ke record Page yang dibuat otomatis untuk halaman detail ini
            $table->foreignId('page_id')
                ->nullable()
                ->after('organizer')
                ->constrained('pages')
                ->nullOnDelete();

        });
    }

    public function down(): void
    {
        Schema::table('announcements', function (Blueprint $table) {

            $table->dropForeign(['page_id']);

            $table->dropColumn([
                'show_on_home',
                'event_start_date',
                'event_end_date',
                'location',
                'organizer',
                'page_id',
            ]);

        });
    }
};
