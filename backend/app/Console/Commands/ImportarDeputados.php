<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Deputado;

class ImportarDeputados extends Command
{
    protected $signature = 'importar:deputados';
    protected $description = 'Importa os deputados da API da Câmara dos Deputados';

    public function handle()
    {
        
        $response = Http::get('https://dadosabertos.camara.leg.br/api/v2/deputados');

        if ($response->successful()) {
            $dados = $response->json()['dados'];
            
            foreach ($dados as $d) {
                Deputado::updateOrCreate(
                    ['id_camara' => $d['id']],
                    [
                        'nome' => $d['nome'],
                        'sigla_partido' => $d['siglaPartido'],
                        'sigla_uf' => $d['siglaUf'],
                        'url_foto' => $d['urlFoto'],
                        'email' => $d['email'] ?? null,
                    ]
                );
            }

            $this->info('Deputados importados com sucesso!');
        } else {
            $this->error('Falha ao acessar API da Câmara.');
        }
    }
}
