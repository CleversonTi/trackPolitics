<?php
//backend/routes/api.php

use App\Http\Controllers\Api\DeputadoController;

Route::apiResource('deputados', DeputadoController::class);
