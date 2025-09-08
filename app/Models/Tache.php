<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tache extends Model
{
    protected $fillable = ["nom", "filtre_id"];

    // Un tâche peut appartenir à deux filtres différents (un ou 2)
    public function filtres(){
        return $this->belongsToMany(Filtre::class, 'pivots');
    }
}
