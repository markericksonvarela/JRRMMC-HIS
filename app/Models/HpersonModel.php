<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HpersonModel extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'hperson';
    
    // Primary key
    protected $primaryKey = 'hpercode';
    
    // Primary key type
    protected $keyType = 'string';
    
    // Primary key is not auto-incrementing
    public $incrementing = false;
    
    // Disable timestamps
    public $timestamps = false;

    // Mass assignable attributes
    protected $fillable = [
        'hpercode',
        'patlast',
        'patfirst',
        'patmiddle',
        // add other columns here
    ];

    // Attributes that should be hidden for arrays/JSON
    protected $hidden = [
        // add sensitive fields here (e.g., 'password', 'token')
    ];

    // Attributes that should be cast to native types
    protected $casts = [
        // example: 'birth_date' => 'datetime',
        // example: 'is_active' => 'boolean',
    ];

    /**
     * Relationship to AdmissionModel
     */
    public function admissions()
    {
        return $this->hasMany(AdmissionModel::class, 'hpercode', 'hpercode');
    }

    /**
     * Get full name attribute
     * 
     * @return string
     */
    public function getFullNameAttribute()
    {
        return trim("{$this->patfirst} {$this->patmiddle} {$this->patlast}");
    }
}