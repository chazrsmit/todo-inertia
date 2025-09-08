<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    protected $fillable = ["nom", "filtre_id"];

    // Un tâche 'appartient' à un seul filtre (elle n'en a qu'un)
    public function filtre(){
        return $this->belongsTo(Filtre::class);
    }
}
