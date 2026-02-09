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
        'admdate'
        // add other columns here
    ];

    // Attributes that should be hidden for arrays/JSON
    protected $hidden = [
        // add sensitive fields here (e.g., 'password', 'token')
    ];

    // Attributes that should be cast to native types
    protected $casts = [
        // example: 'admdate' => 'datetime',
        // example: 'is_active' => 'boolean',
    ];

    /**
     * Relationship to HpersonModel
     */
    public function patient()
    {
        return $this->belongsTo(HpersonModel::class, 'hpercode', 'hpercode');
    }

    /**
     * Scope to join with patient data
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithPatientData($query)
    {
        return $query->leftJoin('hperson', 'hadmlog.hpercode', '=', 'hperson.hpercode')
            ->select(
                'hadmlog.enccode',
                'hadmlog.hpercode',
                'hadmlog.admdate',
                'hperson.patfirst',
                'hperson.patmiddle',
                'hperson.patlast'
            );
    }

    /**
     * Scope to filter by latest year
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeLatestYear($query)
    {
        $latestYear = self::selectRaw('YEAR(MAX(admdate)) as latest_year')
            ->value('latest_year');
        
        return $query->whereYear('hadmlog.admdate', $latestYear);
    }

    /**
     * Scope to search across admission and patient fields
     * 
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $search
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search)
    {
        if (empty($search)) {
            return $query;
        }

        return $query->where(function($q) use ($search) {
            $q->where('hadmlog.enccode', 'like', "%{$search}%")
              ->orWhere('hadmlog.hpercode', 'like', "%{$search}%")
              ->orWhere('hperson.patfirst', 'like', "%{$search}%")
              ->orWhere('hperson.patmiddle', 'like', "%{$search}%")
              ->orWhere('hperson.patlast', 'like', "%{$search}%");
        });
    }
}