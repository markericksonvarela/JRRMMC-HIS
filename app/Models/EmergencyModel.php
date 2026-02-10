<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class EmergencyModel extends Model
{
    use HasFactory;

    protected $table = 'herlog';
    protected $primaryKey = 'enccode';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'enccode',
        'hpercode',
        'erdate',
        'ertime',
        'erstat',
        'tsdesc',
        'tscode',
    ];

    private static function datatable(array $filters = [])
    {
        $query = DB::table('herlog')
            ->join('hperson', 'herlog.hpercode', '=', 'hperson.hpercode', 'inner')
            ->leftJoin('htypser', 'htypser.tscode', '=', 'herlog.tscode')
            ->leftJoin('henctr', 'henctr.enccode', '=', 'herlog.enccode')
            ->leftJoin('hpatroom', 'hpatroom.enccode', '=', 'herlog.enccode')
            ->leftJoin('hbed', 'hpatroom.bdintkey', '=', 'hbed.bdintkey')
            ->leftJoin('hward', 'hbed.wardcode', '=', 'hward.wardcode')
            ->leftJoin('hroom', 'hbed.rmintkey', '=', 'hroom.rmintkey')
            ->select(
                'herlog.enccode',
                'herlog.hpercode',
                'herlog.erstat',
                'herlog.erdate',
                'hperson.patsex',
                'htypser.tsdesc',
                'htypser.tscode',
                'hward.wardname',
                'hward.wardcode',
                'hroom.rmname',
                'hbed.bdname',
                DB::raw("(
                    RTRIM(LTRIM(hperson.patlast)) + ', ' +
                    RTRIM(LTRIM(hperson.patfirst)) +
                    CASE 
                        WHEN hperson.patsuffix IS NULL OR hperson.patsuffix = 'NOTAP' OR RTRIM(LTRIM(hperson.patsuffix)) = ''
                        THEN ''
                        ELSE ' ' + RTRIM(LTRIM(hperson.patsuffix))
                    END +
                    CASE 
                        WHEN hperson.patmiddle IS NULL OR RTRIM(LTRIM(hperson.patmiddle)) = ''
                        THEN ''
                        ELSE ', ' + RTRIM(LTRIM(hperson.patmiddle))
                    END
                ) AS name"),
                DB::raw("CONVERT(INTEGER, herlog.patage, 0) AS age")
            );

        return $query;
    }

    // methods

    public static function getPatientsList(array $filters = [])
    {  
        return self::datatable($filters);
    }

    public static function getPatientByEnccode(string $enccode): ?object
    {
        return self::datatable()
            ->where('herlog.enccode', $enccode)
            ->first();
    }

    public static function getPatientInformation(?object $patient): ?array
    {
        if (!$patient) {
            return null;
        }

        return [
            'enccode' => $patient->enccode ?? null,
            'hpercode' => $patient->hpercode ?? null,
            'name' => $patient->name ?? 'N/A',
            'age' => $patient->age ?? 0,
            'patsex' => $patient->patsex ?? 'N/A',
            'tsdesc' => $patient->tsdesc ?? 'N/A',
            'erdate' => $patient->erdate ?? null,
            'ertime' => $patient->ertime ?? null,
            'erstat' => $patient->erstat ?? null,
        ];
    }

    //dashboard stats
    public static function getStatistics(string $startDate, string $endDate): array
    {
        $baseQuery = DB::table('herlog')
            ->join('henctr', 'henctr.enccode', '=', 'herlog.enccode')
            ->where('herlog.erstat', 'A')
            ->where('henctr.encstat', 'A');

        return [
            'total' => (clone $baseQuery)
                ->whereBetween('herlog.erdate', [$startDate, $endDate])
                ->count(),
            
            'today' => (clone $baseQuery)
                ->whereDate('herlog.erdate', now())
                ->count(),
            
            'by_service' => DB::table('herlog')
                ->join('htypser', 'htypser.tscode', '=', 'herlog.tscode')
                ->join('henctr', 'henctr.enccode', '=', 'herlog.enccode')
                ->where('herlog.erstat', 'A')
                ->where('henctr.encstat', 'A')
                ->whereBetween('herlog.erdate', [$startDate, $endDate])
                ->select('htypser.tsdesc', DB::raw('COUNT(*) as count'))
                ->groupBy('htypser.tsdesc')
                ->orderByDesc('count')
                ->get(),
            
            'by_sex' => DB::table('herlog')
                ->join('hperson', 'hperson.hpercode', '=', 'herlog.hpercode')
                ->join('henctr', 'henctr.enccode', '=', 'herlog.enccode')
                ->where('herlog.erstat', 'A')
                ->where('henctr.encstat', 'A')
                ->whereBetween('herlog.erdate', [$startDate, $endDate])
                ->select('hperson.patsex', DB::raw('COUNT(*) as count'))
                ->groupBy('hperson.patsex')
                ->get(),
            
            'age_groups' => DB::table('herlog')
                ->join('henctr', 'henctr.enccode', '=', 'herlog.enccode')
                ->where('herlog.erstat', 'A')
                ->where('henctr.encstat', 'A')
                ->whereBetween('herlog.erdate', [$startDate, $endDate])
                ->select(
                    DB::raw("
                        CASE
                            WHEN CONVERT(INTEGER, herlog.patage, 0) < 18 THEN 'Pediatric (0-17)'
                            WHEN CONVERT(INTEGER, herlog.patage, 0) BETWEEN 18 AND 35 THEN 'Young Adult (18-35)'
                            WHEN CONVERT(INTEGER, herlog.patage, 0) BETWEEN 36 AND 60 THEN 'Adult (36-60)'
                            ELSE 'Senior (60+)'
                        END as age_group
                    "),
                    DB::raw('COUNT(*) as count')
                )
                ->groupBy(DB::raw("
                    CASE
                        WHEN CONVERT(INTEGER, herlog.patage, 0) < 18 THEN 'Pediatric (0-17)'
                        WHEN CONVERT(INTEGER, herlog.patage, 0) BETWEEN 18 AND 35 THEN 'Young Adult (18-35)'
                        WHEN CONVERT(INTEGER, herlog.patage, 0) BETWEEN 36 AND 60 THEN 'Adult (36-60)'
                        ELSE 'Senior (60+)'
                    END
                "))
                ->get(),
        ];
    }
}