<?php

namespace App\Jobs;

use App\Models\Despesa;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ImportarDespesasDeputado implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $id;

    /**
     * Create a new job instance.
     */
    public function __construct($id)
    {
        $this->id = $id;
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        Log::info("🎯 Executando job de despesas para deputado ID: {$this->id}");

        $response = Http::get("https://dadosabertos.camara.leg.br/api/v2/deputados/{$this->id}/despesas");

        if ($response->failed()) {
            Log::error("❌ Erro ao acessar a API de despesas para deputado {$this->id}");
            return;
        }

        // ✅ Usa JSON diretamente (a API retorna JSON, não XML)
        $dados = $response->json();
        $registros = $dados['dados'] ?? [];

        if (empty($registros)) {
            Log::warning("⚠️ Nenhuma despesa encontrada para o deputado {$this->id}");
            return;
        }

        foreach ($registros as $registro) {
            Despesa::create([
                'deputado_id' => $this->id,
                'tipo_despesa' => $registro['tipoDespesa'] ?? '',
                'nome_fornecedor' => $registro['nomeFornecedor'] ?? '',
                'cnpj_cpf_fornecedor' => $registro['cnpjCpfFornecedor'] ?? '',
                'numero_documento' => $registro['numDocumento'] ?? '',
                'data_documento' => $registro['dataDocumento'] ?? null,
                'valor_documento' => isset($registro['valorDocumento']) ? floatval($registro['valorDocumento']) : null,
                'mes' => $registro['mes'] ?? null,
                'ano' => $registro['ano'] ?? null,
            ]);
        }

        Log::info("✅ Despesas do deputado {$this->id} importadas com sucesso.");
    }
}
