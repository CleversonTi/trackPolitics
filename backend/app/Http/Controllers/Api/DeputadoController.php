<?php
//backend/app/Http/Controllers/Api/DeputadoController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deputado;
use App\Jobs\ImportarDespesasDeputado;
use App\Models\Despesa;

class DeputadoController extends Controller
{
   public function index(Request $request)
{
    $query = Deputado::query();

    if ($request->filled('busca')) {
        $query->where('nome', 'like', '%' . $request->busca . '%');
    }

    $paginado = $query->paginate(10);

    return response()->json([
        'data' => $paginado->items(),
        'current_page' => $paginado->currentPage(),
        'last_page' => $paginado->lastPage(),
        'total' => $paginado->total(),
    ]);
}


    public function show($id)
    {
        $deputado = Deputado::findOrFail($id);
        return response()->json($deputado);
    }

    public function store(Request $request)
    {
        $deputado = Deputado::create($request->all());
        return response()->json($deputado, 201);
    }

    public function update(Request $request, $id)
    {
        $deputado = Deputado::findOrFail($id);
        $deputado->update($request->all());
        return response()->json($deputado);
    }
   public function despesas($id)
    {
        $deputado = Deputado::findOrFail($id);
        $idCamara = $deputado->id_camara;

        // Só importa se não tiver no banco
        $existe = Despesa::where('deputado_id', $idCamara)->exists();
        if (!$existe) {
            ImportarDespesasDeputado::dispatchSync($idCamara);
        }

        // Paginação: pega ?pagina=X na query
        $porPagina = 10;
        $despesas = Despesa::where('deputado_id', $idCamara)
            ->orderBy('data_documento', 'desc')
            ->paginate($porPagina);

        return response()->json([
            'dados' => $despesas->items(),
            'links' => [
                'last' => ['page' => $despesas->lastPage()],
            ],
        ]);
    }

    public function destroy($id)
    {
        Deputado::destroy($id);
        return response()->json(null, 204);
    }
}
