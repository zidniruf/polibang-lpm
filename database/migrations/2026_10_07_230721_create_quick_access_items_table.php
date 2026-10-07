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
        Schema::create('quick_access_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('type', ['checkbox', 'link']);
            $table->boolean('display_on_frontend')->default(false);
            $table->string('link')->nullable();
            $table->integer('order')->default(0);
            $table->string('icon')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quick_access_items');
    }
};
