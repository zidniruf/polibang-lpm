
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('navigation_categories', function (Blueprint $table) {
            $table->id();

            $table->string('name');
            $table->string('slug');

            $table->foreignId('menu_group_id')
                ->constrained('menu_groups')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            $table->unsignedInteger('sort_order')->default(0);

            $table->timestamps();

            $table->unique(['menu_group_id', 'slug']);
            $table->index(['menu_group_id', 'sort_order']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('navigation_categories');
    }
};
