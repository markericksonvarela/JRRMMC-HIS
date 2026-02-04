<?php

namespace App\Helpers;

class HonisEncryption
{
    private static $key = "advise";

    public static function decrypt($encrypted)
    {
        if (empty($encrypted)) {
            return '';
        }

        $key = self::$key;
        $llr = strlen($encrypted);
        
        // Fix: Extend key WITHOUT adding extra spaces
        $key1 = str_repeat($key, ceil($llr / strlen($key)));
        $key1 = substr($key1, 0, $llr);

        $result = '';
        for ($i = 0; $i < $llr; $i++) {
            $b = ord($encrypted[$i]);
            $c = ord($key1[$i]);
            $k = $b - $c + 124;
            
            while ($k < 32) $k += 256;
            while ($k > 255) $k -= 256;
            
            $result .= chr($k);
        }

        // Fix: Return strtoupper to match the original encryption intent
        return strtoupper(trim($result));
    }

    public static function encrypt($raw)
    {
        $key = self::$key;
        $raw = strtoupper(trim($raw));
        $llr = strlen($raw);

        // Fix: Extend key WITHOUT adding extra spaces
        $key1 = str_repeat($key, ceil($llr / strlen($key)));
        $key1 = substr($key1, 0, $llr);

        $s_enc = '';
        for ($i = 0; $i < $llr; $i++) {
            $b = ord($raw[$i]);
            $c = ord($key1[$i]);
            $k = $b + $c - 124;
            
            while ($k < 32) $k += 256;
            while ($k > 255) $k -= 256;
            
            $s_enc .= chr($k);
        }

        return $s_enc;
    }
}