<?php

namespace App\Http\Middleware;

use Closure;

class AuthResource
{

    public function handle($request, Closure $next)
    {
        if ($request->route('companyID')) {
            $company = Company::find($request->route('companyID'));
            if ($company && $company->user_id != auth()->user()->id) {
                return redirect('/');
            }
        }

        return $next($request);
    }
}
