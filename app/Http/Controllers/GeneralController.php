<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function index() {
        $taches = Tache::all();

        return Inertia::render('Home', [
            'taches' => $taches,
            'csrf_token' => csrf_token()
        ]);
    }
}
