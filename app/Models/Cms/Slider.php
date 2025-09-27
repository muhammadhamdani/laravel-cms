<?php

namespace App\Models\Cms;

use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    protected $fillable = [
        'name',
        'image',
        'link',
    ];
}
