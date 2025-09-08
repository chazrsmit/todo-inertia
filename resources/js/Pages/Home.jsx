import { router } from "@inertiajs/react";

export default function Home({ taches, csrf_token }){

    // vu sur Claude:
       const handleCheckboxChange = (tacheId, isCurrentlyChecked) => {
        // envoyer les infos dans le backend
        router.put(`/tache/update/${tacheId}`, {
            checked: !isCurrentlyChecked,
            _token: csrf_token
        });
    };

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
                    {taches.map(tache => (
                        <div key={tache.id} className="d-flex gap-3">
                            <input type="checkbox"
                            name=""
                            id=""
                            checked={tache.checked === 1}
                            onChange={() => handleCheckboxChange(tache.id, tache.checked === 1)} 
                            />
                            <p>{tache.nom}</p>
                            {/* affichage des filtres */}
                                                       <div>
                                <strong>Filtres: </strong>
                                {tache.filtres && tache.filtres.length > 0 ? (
                                    tache.filtres.map((filtre, index) => (
                                        <span key={filtre.id}>
                                            {filtre.nom}
                                            {index < tache.filtres.length - 1 ? ', ' : ''}
                                        </span>
                                    ))
                                ) : (
                                    <span>Aucun filtre</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>


            </div>
        </>
    )
}