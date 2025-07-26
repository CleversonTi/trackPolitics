<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Despesa extends Model
{
    protected $fillable = [
        'deputado_id',
        'numero_documento',
        'data_documento',
        'tipo_despesa',
        'valor_documento',
        'nome_fornecedor',
        'cnpj_cpf_fornecedor',
        'mes',
        'ano',
    ];

    public $timestamps = false; // ou true, se estiver usando created_at e updated_at
}
