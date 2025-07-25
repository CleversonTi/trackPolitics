<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deputado extends Model
{
    protected $fillable = [
        'id_camara',
        'nome',
        'sigla_partido',
        'sigla_uf',
        'url_foto',
        'email',
    ];
}
