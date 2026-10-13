<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('navigation_links', function (Blueprint $table) {
            $table->foreignId('parent_id')->nullable()->constrained('navigation_links')->nullOnDelete();
            $table->foreignId('menu_group_id')->nullable()->constrained('menu_groups')->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('navigation_links', function (Blueprint $table) {
            $table->dropForeign(['parent_id']);
            $table->dropColumn('parent_id');
            $table->dropForeign(['menu_group_id']);
            $table->dropColumn('menu_group_id');
        });
    }
};
