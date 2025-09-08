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

        // on va donc utiliser la fonction attach() pour attribuer les filtres_id correspondants
        // cette fonction permet d'associer des données dans une relation many 2 many
        // avec une condition pour donc attribuer les filtres corrects : actives (1 et 2) et terminées (1 et 3)

        if ($request->boolean('checked') = 0) {
            $tache->filtres()->attach([1,2]);
        }
        else {
            $tache->filtres()->attach([1,3]);
        };

        return redirect('/')->with('success', 'Nouvelle tâche ajoutée avec succès !');

    }

    // Modifier une tâche :
    // On a le choix de modifier le nom de la tâche mais également de changer le filtre avec l'id 2 en 3 pour indiquer qu'elle est terminée > filtres->id[1, 3]

    public function update($id, Request $request) {
        $tache = Tache::find($id)->first();

        $tache->nom = $request->nom;
        // idem pour la logiquement checkbox
        $tache->checked =$request->boolean('checked');

        if ($request->boolean('checked') = 0) {
            $tache->filtres()->attach([1,2]);
        }
        else {
            $tache->filtres()->attach([1,3]);
        };

        // il y a déjà une id associée à la tâche donc on peut mettre le update() à la fin
        $tache->update();

        return redirect("/")->with('success', 'Tâche modifiée avec succès !');
    }
}
