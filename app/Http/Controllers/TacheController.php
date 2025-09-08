<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TacheController extends Controller
{
    //

    // Ajouter une tâche :
    // on va dire qu'automatiquement, quand une tâche est créée, on va lui attribuer les filtres avec id 1 et 2 (avec attach) > filtres->id[1,2]

    public function store(Request $request) {
        
    }

    // Modifier une tâche :
    // On a le choix de modifier le nom de la tâche mais également de changer le filtre avec l'id 2 en 3 pour indiquer qu'elle est terminée > filtres->id[1, 3]
}
