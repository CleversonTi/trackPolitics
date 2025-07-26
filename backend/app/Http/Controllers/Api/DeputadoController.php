<?php
//backend/app/Http/Controllers/Api/DeputadoController.php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Deputado;

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
        return response()->json(Deputado::findOrFail($id));
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

    public function destroy($id)
    {
        Deputado::destroy($id);
        return response()->json(null, 204);
    }
}
