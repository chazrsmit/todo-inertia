<?php

namespace App\Http\Controllers;

use App\Models\Tache;
use Illuminate\Http\Request;

class TacheController extends Controller
{
    //

    // Ajouter une tâche :
    // on va dire qu'automatiquement, quand une tâche est créée, SI on a pas check l'input boolean, alors on va lui attribuer les filtres avec id 1 et 2 (avec attach) > filtres->id[1,2]

    public function store(Request $request) {
        $tache = new Tache();

        $tache->nom = $request->nom;
        // comme il y a une checkbox, il faut mettre cette ligne 
        // unchecked = 0 (active) ; checked = 1 (terminée)
        $tache->checked =$request->boolean('checked');


        // on sauve la tâche avant d'établir la relation many 2 many (car la fonction attach a besoin de l'id de la tâche)
        $tache->save();

        // on va donc utiliser la fonction attach() pour attribuer automatiquement les filtres_id 1 et 2.
        // cette fonction permet d'associer des données dans une relation many 2 many
        $tache->filtres()->attach([1,2]);

        return redirect('/')->with('success', 'Nouvelle tâche ajoutée avec succès !');

    }

    // Modifier une tâche :
    // On a le choix de modifier le nom de la tâche mais également de changer le filtre avec l'id 2 en 3 pour indiquer qu'elle est terminée > filtres->id[1, 3]

    public function update($id, Request $request) {
        $tache = Tache::find($id)->first();

        $tache->nom = $request->nom;

        $tache->update();

        // condition liée au fait que le input soit checked ou pas

        $tache->filtres()->attach([1,2]);
    }
}
