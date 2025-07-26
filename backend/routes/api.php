<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DeputadoController;

Route::apiResource('deputados', DeputadoController::class);
Route::get('/deputados/{id}/despesas', [DeputadoController::class, 'despesas']);
