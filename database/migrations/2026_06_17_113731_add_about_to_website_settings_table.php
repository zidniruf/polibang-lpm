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
        Schema::table('website_settings', function ($table) {

            $table->string('about_title')
                ->nullable()
                ->after('hero_image_2');

            $table->longText('about_content')
                ->nullable()
                ->after('about_title');

            $table->string('about_image')
                ->nullable()
                ->after('about_content');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('website_settings', function (Blueprint $table) {
            //
        });
    }
};
