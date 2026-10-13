
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            // Halaman lama tetap menjadi sub navigasi.
            $table->string('navigation_type')
                ->default('sub');

            // Induk untuk halaman sub-sub navigasi.
            $table->foreignId('parent_page_id')
                ->nullable()
                ->constrained('pages')
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign(['parent_page_id']);

            $table->dropColumn([
                'navigation_type',
                'parent_page_id',
            ]);
        });
    }
};
