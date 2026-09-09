<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('website_settings', function (Blueprint $table) {
            $table->id();

            $table->string('site_name')->default('P2M Politeknik Balekambang');

            $table->string('logo')->nullable();

            $table->string('favicon')->nullable();

            $table->string('hero_title')->nullable();

            $table->text('hero_subtitle')->nullable();

            $table->string('email')->nullable();

            $table->string('phone')->nullable();

            $table->text('address')->nullable();

            $table->string('instagram')->nullable();

            $table->string('facebook')->nullable();

            $table->string('youtube')->nullable();

            $table->string('tiktok')->nullable();

            $table->string('whatsapp')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('website_settings');
    }
};