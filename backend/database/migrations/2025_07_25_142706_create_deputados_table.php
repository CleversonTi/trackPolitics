<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('deputados', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('id_camara')->unique(); // CAMPO QUE ESTÁ FALTANDO
            $table->string('nome');
            $table->string('sigla_partido')->nullable();
            $table->string('sigla_uf')->nullable();
            $table->string('url_foto')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('deputados');
    }
};
