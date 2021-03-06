<?php

namespace App\Http\Resources;

use App\Frontend;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FrontendResources extends JsonResource
{
    private $user;

    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray()
    {
        return [
            'id' => Frontend::ATTRIBUTE_ID,
            'start_date' => Frontend::ATTRIBUTE_START_DATE,
            'end_date' => Frontend::ATTRIBUTE_END_DATE,
            'avgPageLoadTime' => Frontend::ATTRIBUTE_AVERAGE_PAGE_LOAD_TIME,
            'user' => new UserResource($this->user)
        ];
    }
}
