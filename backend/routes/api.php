<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DeputadoController;

Route::apiResource('deputados', DeputadoController::class);
