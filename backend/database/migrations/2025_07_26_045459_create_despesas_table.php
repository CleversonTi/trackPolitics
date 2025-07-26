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
    Schema::create('despesas', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('deputado_id');
        $table->string('tipo_despesa');
        $table->string('nome_fornecedor')->nullable();
        $table->string('cnpj_cpf_fornecedor')->nullable();
        $table->string('numero_documento')->nullable();
        $table->date('data_documento')->nullable();
        $table->decimal('valor_documento', 10, 2)->nullable();
        $table->string('mes')->nullable();
        $table->string('ano')->nullable();
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('despesas');
    }
};
