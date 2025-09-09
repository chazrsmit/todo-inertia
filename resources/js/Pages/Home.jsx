import { router } from "@inertiajs/react";
import { useState } from "react";

export default function Home({ taches, taches_not_done, taches_done, csrf_token }){

    // pour gérer les filtres
    const [filtreActif, setFiltreActif] = useState('toutes');
    // par défaut on affiche tout

    // vu sur Claude:
    const handleCheckboxChange = (tacheId, isChecked) => {
        // envoyer les infos dans le backend
        router.put(`/tache/update/${tacheId}`, {
            checked: !isChecked,
            // cette ligne ci-dessus dis que le checked va prendre l'INVERSE de l'état initial de la checkbox;
            // si la box n'était pas checked de base, on envoit un false, ce qui done : checked: !false = true
            // la tâche devient donc tache.checked === 1
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
        <div className="app-container">
            <div className="box">

                {/* Nouvelle tâche  */}
                <div className="new">
                    <form action="/tache/add" method="POST" className="new-task-form">
                        {/* Ajouter un e.prevent default */}
                        <input type="hidden" name="_token" value={csrf_token} />
                        <input 
                            type="checkbox" 
                            name="checked" 
                            className="task-checkbox" 
                        />
                        <input 
                            type="text" 
                            name="nom" 
                            className="task-input" 
                            placeholder="Ajouter une nouvelle tâche"
                        />
                        <button type="submit" className="add-button">+</button>
                    </form>
                </div>

                {/* Liste des tâches */}
                <div className="list">
                    <div className="tasks-container">
                        {TachesAffichees().length > 0 ? (
                            TachesAffichees().map(tache => (
                                <div key={tache.id} className="task-item">
                                    <input 
                                        type="checkbox"
                                        className="task-checkbox"
                                        checked={tache.checked === 1}
                                        onChange={() => handleCheckboxChange(tache.id, tache.checked === 1)} 
                                        // on envoit dans la fonction l'id de la tâche, ainsi qu'un true ou false (si de base c'était pas checked, on va envoyer un false; l'inverse si c'était dejà checked)
                                    />
                                    <p className={`task-text ${tache.checked === 1 ? 'completed' : ''}`}>
                                        {tache.nom}
                                    </p>
                                </div>
                            ))) : (
                                <div className="no-tasks">
                                    <p>Pas de tâches à afficher.</p>
                                </div>
                            )
                        }
                    </div>

                    {/* Footer section */}
                    <div className="list-footer">
                        
                        {/* Compteur de tâches */}
                        <div className="footer-content">
                            <p className="task-counter">
                                {taches_not_done.length} tâche{taches_not_done.length !== 1 ? 's' : ''} à encore effectuer.
                            </p>

                            {/* Filtres */}
                            <div className="filter-buttons">
                                <button 
                                    type="button"
                                    className={`filter-btn ${filtreActif === 'toutes' ? 'active' : ''}`}
                                    onClick={() => setFiltreActif('toutes')}
                                >
                                    Toutes
                                </button>
                                <button 
                                    type="button"
                                    className={`filter-btn ${filtreActif === 'actives' ? 'active' : ''}`}
                                    onClick={() => setFiltreActif('actives')}
                                >
                                    Actives
                                </button>
                                <button 
                                    type="button"
                                    className={`filter-btn ${filtreActif === 'terminées' ? 'active' : ''}`}
                                    onClick={() => setFiltreActif('terminées')}
                                >
                                    Terminées
                                </button>
                            </div>
                        </div>

                        {/* Supprimer toutes les tâches dont checked == 1 */}
                        {taches_done.length > 0 && (
                            <div className="clear-section">
                                <form action="tache/destroy" method="POST">
                                    <input type="hidden" name="_method" value="DELETE" />
                                    <input type="hidden" name="_token" value={csrf_token} />
                                    <button type="submit" className="clear-btn">
                                        Clear les tâches terminées
                                    </button>
                                </form>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    )
}