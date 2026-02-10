<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AdmissionModel extends Model
{
    use HasFactory;

    protected $table = 'hadmlog';
    protected $primaryKey = 'enccode';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'enccode',
        'hpercode',
        'admdate',
    ];

    private static function datatable(array $filters = [])
    {
        $query = DB::table('hadmlog')
            ->join('hperson', 'hadmlog.hpercode', '=', 'hperson.hpercode', 'inner')
            ->leftJoin('htypser', 'htypser.tscode', '=', 'hadmlog.tscode')
            ->leftJoin('henctr', 'henctr.enccode', '=', 'hadmlog.enccode')
            ->leftJoin('hpatroom', 'hpatroom.enccode', '=', 'hadmlog.enccode')
            ->leftJoin('hbed', 'hpatroom.bdintkey', '=', 'hbed.bdintkey')
            ->leftJoin('hward', 'hbed.wardcode', '=', 'hward.wardcode')
            ->leftJoin('hroom', 'hbed.rmintkey', '=', 'hroom.rmintkey')
            ->select(
                'hadmlog.enccode',
                'hadmlog.hpercode',
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
                ) AS patient_name"),
                DB::raw("CONVERT(INTEGER, hadmlog.patage, 0) AS age"),
                DB::raw("CONVERT(VARCHAR(10), hadmlog.admdate, 101) AS admdate"),
                DB::raw("ISNULL(FORMAT(CAST(hadmlog.admtime AS TIME), N'hh:mm tt'), 'N/A') AS admtime")
            );

        return $query;
    }


    public static function getPatientsList(array $filters = [])
    {  
        return self::datatable($filters);
    }

    public static function getPatientByEnccode(string $enccode): ?object
    {
        return self::datatable()
            ->where('hadmlog.enccode', $enccode)
            ->first();
    }
}