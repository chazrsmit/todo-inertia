<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Filtre extends Model
{
    protected $fillable = ['nom'];

    // Un filtre peut être attribué à plusieurs tâches
    public function taches() {
        return $this->belongsToMany(Tache::class, 'pivots');
    }
}
