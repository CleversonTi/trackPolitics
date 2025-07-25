<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Deputado;

class DeputadoSeeder extends Seeder
{
    public function run()
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

            $this->command->info('Deputados importados com sucesso!');
        } else {
            $this->command->error('Falha ao buscar dados da API da Câmara.');
        }
    }
}
