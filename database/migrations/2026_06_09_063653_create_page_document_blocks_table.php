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
Schema::create('page_document_blocks', function (Blueprint $table) {

    $table->id();

    $table->foreignId('page_id')
        ->constrained()
        ->cascadeOnDelete();

    $table->string('title');

    $table->enum('filter_type', [
        'category',
        'year',
        'document',
    ]);

    $table->string('filter_value')
        ->nullable();

    $table->integer('sort_order')
        ->default(0);

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_document_blocks');
    }
};
