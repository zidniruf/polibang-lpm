<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HideAdminPanelFromGuests
{
    public function handle(Request $request, Closure $next): Response
    {
        if (
            $request->is('adm-p2mpolibang') ||
            $request->is('adm-p2mpolibang/*')
        ) {
            if (
                ! $request->is('adm-p2mpolibang/login') &&
                ! auth()->guard('web')->check()
            ) {
                abort(404);
            }
        }

        return $next($request);
    }
}