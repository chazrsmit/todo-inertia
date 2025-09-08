<?php

namespace Database\Seeders;

use App\Models\Filtre;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FiltreSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Filtre::insert([
            [
                'nom' => 'Toutes'
            ],
            [
                'nom' => 'Actives'
            ],
            [
                'nom' => 'Terminées'
            ]
        ]);
    }
}
