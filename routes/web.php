<?php

use App\Http\Controllers\GeneralController;
use App\Http\Controllers\TacheController;
use Illuminate\Support\Facades\Route;

Route::get('/', [TacheController::class, 'index'])->name('home');

// CRUD

Route::post('tache/add', [TacheController::class, 'store'])->name('add');
Route::put('tache/update/{id}', [TacheController::class, 'update'])->name('update');
Route::delete('tache/destroy', [TacheController::class, 'destroy']);