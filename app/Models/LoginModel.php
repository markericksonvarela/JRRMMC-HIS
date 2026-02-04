<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Helpers\HonisEncryption;

class LoginModel extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $table = 'user_acc';

    protected $primaryKey = 'user_name';
    public $incrementing = false;
    protected $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'user_name',
        'user_level',
        'user_pass',
        'user_exp',
        'employeeid',
        'workstation'
    ];

    protected $hidden = [
        'user_pass',
    ];

    public function getAuthPassword()
    {
        return $this->user_pass;
    }

    public function getNameAttribute()
    {
        return $this->user_name;
    }

    public function getEmailAttribute()
    {
        return $this->user_name; 
    }

    protected $appends = ['name', 'email'];

    public function checkPassword($plainPassword)
    {
        $decryptedPassword = HonisEncryption::decrypt($this->user_pass);
        return strtoupper(trim($plainPassword)) === $decryptedPassword;
    }

    public function setUserPassAttribute($password)
    {
        $this->attributes['user_pass'] = HonisEncryption::encrypt($password);
    }
}