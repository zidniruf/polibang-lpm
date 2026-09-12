<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('pages', function (Blueprint $table) {

            $table->foreignId('menu_group_id')
                ->nullable()
                ->after('content')
                ->constrained()
                ->cascadeOnDelete();

        });
    }

    public function down(): void
    {
        Schema::table('pages', function (Blueprint $table) {

            $table->dropConstrainedForeignId('menu_group_id');

        });
    }
};
