<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdmissionModel extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'hadmlog';
    
    // Primary key
    protected $primaryKey = 'enccode';
    
    // Primary key type
    protected $keyType = 'string';
    
    // Primary key is not auto-incrementing
    public $incrementing = false;
    
    // Disable timestamps
    public $timestamps = false;

    // Mass assignable attributes
    protected $fillable = [
        'enccode',
        'hpercode',
        // add other columns here
    ];

    // Attributes that should be hidden for arrays/JSON
    protected $hidden = [
        // add sensitive fields here (e.g., 'password', 'token')
    ];

    // Attributes that should be cast to native types
    protected $casts = [
        // example: 'admission_date' => 'datetime',
        // example: 'is_active' => 'boolean',
    ];
}