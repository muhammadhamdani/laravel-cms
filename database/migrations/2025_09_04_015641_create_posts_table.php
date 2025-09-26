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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug');
            $table->string('image')->nullable();
            $table->text('excerpt');
            $table->text('description');
            $table->enum('status', ['DRAFT', 'PUBLISHED'])->default('DRAFT');
            $table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });

        Schema::create('category_posts', function (Blueprint $table) {
            $table->foreignId('post_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('category_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['post_id', 'category_id']);
        });

        Schema::create('tag_posts', function (Blueprint $table) {
            $table->foreignId('post_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('tag_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->primary(['post_id', 'tag_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_posts');
        Schema::dropIfExists('tag_posts');
        Schema::dropIfExists('posts');
    }
};
