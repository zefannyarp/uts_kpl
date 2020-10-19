<?php

namespace App\Http\Resources;

use App\UptimeSummary;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UptimeSummaryResources extends JsonResource
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
            'id' => UptimeSummary::ATTRIBUTE_ID,
            'start_date' => UptimeSummary::ATTRIBUTE_START_DATE,
            'end_date' => UptimeSummary::ATTRIBUTE_END_DATE,
            'total_error' => UptimeSummary::ATTRIBUTE_TOTAL_ERROR,
            'downtime' => UptimeSummary::ATTRIBUTE_DOWNTIME,
            'user' => new UserResource($this->user)
        ];
    }
}
