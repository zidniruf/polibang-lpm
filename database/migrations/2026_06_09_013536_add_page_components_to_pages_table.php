<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {

            $table->boolean('show_documents')
                ->default(false)
                ->after('content');

            $table->boolean('show_gallery')
                ->default(false)
                ->after('show_documents');

            $table->boolean('show_structure')
                ->default(false)
                ->after('show_gallery');

        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {

            $table->dropColumn([
                'show_documents',
                'show_gallery',
                'show_structure',
            ]);

        });
    }
};
