import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Home({ taches, taches_not_done, taches_done, csrf_token }){

    // pour gérer les filtres
    const [filtreActif, setFiltreActif] = useState('toutes');
    // par défaut on affiche tout

    // vu sur Claude:
       const handleCheckboxChange = (tacheId, isCurrentlyChecked) => {
        // envoyer les infos dans le backend
        router.put(`/tache/update/${tacheId}`, {
            checked: !isCurrentlyChecked,
            _token: csrf_token
        });
    };

    // fonction sur laquelle on va mapper pour afficher les tâches en fonction du choix du filtre:

    const TachesAffichees = () => {
        // switch case
        switch (filtreActif) {
            case 'actives' :
                return taches_not_done;
            case 'terminées' :
                return taches_done;
            default :
                return taches;
        }
    }

    return(
        <>
            <h1 className="container">To do</h1>

            <div className="border container">

                {/* Nouvelle tâche  */}
                <div className="border">
                    <form action="/tache/add" method="POST">
                        {/* Ajouter un e.prevent default */}
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input type="checkbox" name="checked" id="" />
                        <input type="text" name="nom" id="" placeholder="Ajouter une nouvelle tâche" />
                        <button type="submit">Add</button>
                    </form>
                </div>

                {/* Liste des tâches */}
                <div className="border">
                    
                {TachesAffichees().length > 0 ? (
                    TachesAffichees().map(tache => (
                        <div key={tache.id} className="d-flex gap-3">
                            <input type="checkbox"
                            name=""
                            id=""
                            checked={tache.checked === 1}
                            onChange={() => handleCheckboxChange(tache.id, tache.checked === 1)} 
                            />
                            <p>{tache.nom}</p>
                        </div>
                    ))) : "Pas de tâche(s)"
                }

                    {/* Affichage nombre de tâches qui ne sont pas encore checked (checked == 0)  */}

                    <p>{taches_not_done.length}</p>

                    {/* Filtres */}
                    {/* Input radio -> si un des liens est 'checked', alors il y aura un mapping spécifique. */}
                    <button onClick={() => setFiltreActif('toutes')}>Toutes</button>
                    <button onClick={() => setFiltreActif('actives')}>Actives</button>
                    <button onClick={() => setFiltreActif('terminées')}>Terminées</button>

                    {/* Remettre toutes les tâches à checked == 0 */}
                </div>


            </div>
        </>
    )
}