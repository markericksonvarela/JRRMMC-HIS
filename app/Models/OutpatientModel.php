<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class OutpatientModel extends Model
{
    use HasFactory;

    protected $table = 'hopdlog';
    protected $primaryKey = 'enccode';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'enccode',
        'hpercode',
        'opddate',
        'opdtime',
        'opdstat',
        'tscode',
        'opddisp',
        'patage',
    ];

    private static function datatable(array $filters = [])
    {
        $query = DB::table('hopdlog')
            ->join('hperson', 'hopdlog.hpercode', '=', 'hperson.hpercode', 'inner')
            ->leftJoin('htypser', 'htypser.tscode', '=', 'hopdlog.tscode')
            ->leftJoin('henctr', 'henctr.enccode', '=', 'hopdlog.enccode')
            ->leftJoin('hpatroom', 'hpatroom.enccode', '=', 'hopdlog.enccode')
            ->leftJoin('hbed', 'hpatroom.bdintkey', '=', 'hbed.bdintkey')
            ->leftJoin('hward', 'hbed.wardcode', '=', 'hward.wardcode')
            ->leftJoin('hroom', 'hbed.rmintkey', '=', 'hroom.rmintkey')
            ->select(
                'hopdlog.enccode',
                'hopdlog.hpercode',
                'hopdlog.opddisp',
                'hopdlog.opdstat',
                'hopdlog.opddate',
                'hperson.patsex',
                'htypser.tsdesc',
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
                DB::raw("CONVERT(INTEGER, hopdlog.patage, 0) AS age")
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
            ->where('hopdlog.enccode', $enccode)
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
            'opddate' => $patient->opddate ?? null,
            'opdtime' => $patient->opdtime ?? null,
            'opddisp' => $patient->opddisp ?? null,
            'opdstat' => $patient->opdstat ?? null,
        ];
    }

    //dashboard stats
    public static function getStatistics(string $startDate, string $endDate): array
    {
        $baseQuery = DB::table('hopdlog')
            ->join('henctr', 'henctr.enccode', '=', 'hopdlog.enccode')
            ->where('hopdlog.opdstat', 'A')
            ->where('henctr.encstat', 'A');

        return [
            'total' => (clone $baseQuery)
                ->whereBetween('hopdlog.opddate', [$startDate, $endDate])
                ->count(),
            
            'today' => (clone $baseQuery)
                ->whereDate('hopdlog.opddate', now())
                ->count(),
            
            'by_service' => DB::table('hopdlog')
                ->join('htypser', 'htypser.tscode', '=', 'hopdlog.tscode')
                ->join('henctr', 'henctr.enccode', '=', 'hopdlog.enccode')
                ->where('hopdlog.opdstat', 'A')
                ->where('henctr.encstat', 'A')
                ->whereBetween('hopdlog.opddate', [$startDate, $endDate])
                ->select('htypser.tsdesc', DB::raw('COUNT(*) as count'))
                ->groupBy('htypser.tsdesc')
                ->orderByDesc('count')
                ->get(),
            
            'by_sex' => DB::table('hopdlog')
                ->join('hperson', 'hperson.hpercode', '=', 'hopdlog.hpercode')
                ->join('henctr', 'henctr.enccode', '=', 'hopdlog.enccode')
                ->where('hopdlog.opdstat', 'A')
                ->where('henctr.encstat', 'A')
                ->whereBetween('hopdlog.opddate', [$startDate, $endDate])
                ->select('hperson.patsex', DB::raw('COUNT(*) as count'))
                ->groupBy('hperson.patsex')
                ->get(),
            
            'age_groups' => DB::table('hopdlog')
                ->join('henctr', 'henctr.enccode', '=', 'hopdlog.enccode')
                ->where('hopdlog.opdstat', 'A')
                ->where('henctr.encstat', 'A')
                ->whereBetween('hopdlog.opddate', [$startDate, $endDate])
                ->select(
                    DB::raw("
                        CASE
                            WHEN CONVERT(INTEGER, hopdlog.patage, 0) < 18 THEN 'Pediatric (0-17)'
                            WHEN CONVERT(INTEGER, hopdlog.patage, 0) BETWEEN 18 AND 35 THEN 'Young Adult (18-35)'
                            WHEN CONVERT(INTEGER, hopdlog.patage, 0) BETWEEN 36 AND 60 THEN 'Adult (36-60)'
                            ELSE 'Senior (60+)'
                        END as age_group
                    "),
                    DB::raw('COUNT(*) as count')
                )
                ->groupBy(DB::raw("
                    CASE
                        WHEN CONVERT(INTEGER, hopdlog.patage, 0) < 18 THEN 'Pediatric (0-17)'
                        WHEN CONVERT(INTEGER, hopdlog.patage, 0) BETWEEN 18 AND 35 THEN 'Young Adult (18-35)'
                        WHEN CONVERT(INTEGER, hopdlog.patage, 0) BETWEEN 36 AND 60 THEN 'Adult (36-60)'
                        ELSE 'Senior (60+)'
                    END
                "))
                ->get(),
        ];
    }
}