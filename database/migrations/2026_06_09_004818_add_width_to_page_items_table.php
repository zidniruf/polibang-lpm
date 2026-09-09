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
        Schema::table('page_items', function (Blueprint $table) {

            $table->string('width')
                ->default('100%')
                ->after('file');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('page_items', function (Blueprint $table) {

            $table->dropColumn('width');

        });
    }
};