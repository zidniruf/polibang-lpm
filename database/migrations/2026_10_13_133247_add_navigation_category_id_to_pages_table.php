
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->foreignId('navigation_category_id')
                ->nullable()
                ->after('parent_page_id')
                ->constrained('navigation_categories')
                ->nullOnDelete();
        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {
            $table->dropForeign(['navigation_category_id']);
            $table->dropColumn('navigation_category_id');
        });
    }
};
