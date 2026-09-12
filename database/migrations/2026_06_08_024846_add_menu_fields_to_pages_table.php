<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {

            $table->string('menu_group')
                ->nullable()
                ->after('slug');

            $table->integer('sort_order')
                ->default(0)
                ->after('menu_group');

        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {

            $table->dropColumn([
                'menu_group',
                'sort_order',
            ]);

        });
    }
};
