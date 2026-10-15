<?php

namespace App\Filament\Pages\Auth;

use Filament\Auth\Http\Responses\Contracts\LoginResponse;
use Filament\Auth\Pages\Login as BaseLogin;
use Filament\Notifications\Notification;
use Illuminate\Support\Facades\RateLimiter;

class Login extends BaseLogin
{

protected string $view = 'filament.pages.auth.login';

    private const EMAIL_MAX_ATTEMPTS = 5;

    private const IP_MAX_ATTEMPTS = 20;

    private const DECAY_SECONDS = 900;

    /**
     * Menonaktifkan penghitung bawaan Filament pada halaman ini.
     * Penghitung khusus dikelola di bawah.
     */
    protected function rateLimit(
        $maxAttempts,
        $decaySeconds = 60,
        $method = null,
        $component = null,
    ) {
        // Sengaja kosong agar tidak menghitung percobaan dua kali.
    }

    /**
     * Memeriksa pembatasan sebelum autentikasi dijalankan.
     */
    public function authenticate(): ?LoginResponse
    {
        $data = $this->form->getState();

        $email = mb_strtolower(trim((string) ($data['email'] ?? '')));
        $ip = request()->ip() ?? 'unknown';

        $keys = $this->getLoginRateLimitKeys($ip, $email);

        if (RateLimiter::tooManyAttempts($keys['email_lock'], 1)) {
            $this->sendLockoutNotification($keys['email_lock']);

            return null;
        }

        if (RateLimiter::tooManyAttempts($keys['ip_lock'], 1)) {
            $this->sendLockoutNotification($keys['ip_lock']);

            return null;
        }

        $response = parent::authenticate();

        // Respons LoginResponse menandakan autentikasi berhasil.
        if ($response !== null) {
            RateLimiter::clear($keys['email_attempts']);
        }

        return $response;
    }

    /**
     * Dipanggil Filament saat kredensial tidak valid.
     */
    protected function throwFailureValidationException(): never
    {
        $data = $this->form->getState();

        $email = mb_strtolower(trim((string) ($data['email'] ?? '')));
        $ip = request()->ip() ?? 'unknown';

        $keys = $this->getLoginRateLimitKeys($ip, $email);

        RateLimiter::hit(
            $keys['email_attempts'],
            self::DECAY_SECONDS,
        );

        RateLimiter::hit(
            $keys['ip_attempts'],
            self::DECAY_SECONDS,
        );

        $emailLocked = RateLimiter::attempts(
            $keys['email_attempts'],
        ) >= self::EMAIL_MAX_ATTEMPTS;

        $ipLocked = RateLimiter::attempts(
            $keys['ip_attempts'],
        ) >= self::IP_MAX_ATTEMPTS;

        if ($emailLocked) {
            RateLimiter::clear($keys['email_attempts']);

            RateLimiter::hit(
                $keys['email_lock'],
                self::DECAY_SECONDS,
            );
        }

        if ($ipLocked) {
            RateLimiter::clear($keys['ip_attempts']);

            RateLimiter::hit(
                $keys['ip_lock'],
                self::DECAY_SECONDS,
            );
        }

        if ($emailLocked || $ipLocked) {
            $lockKey = $emailLocked
                ? $keys['email_lock']
                : $keys['ip_lock'];

            $this->sendLockoutNotification($lockKey);
        }

        parent::throwFailureValidationException();
    }

    /**
     * Membuat key terpisah untuk setiap email dan IP.
     */
    private function getLoginRateLimitKeys(
        string $ip,
        string $email,
    ): array {
        $ipHash = hash('sha256', $ip);
        $emailHash = hash('sha256', $email);

        return [
            'email_attempts' => "p2m-login:email-attempts:{$ipHash}:{$emailHash}",
            'email_lock' => "p2m-login:email-lock:{$ipHash}:{$emailHash}",
            'ip_attempts' => "p2m-login:ip-attempts:{$ipHash}",
            'ip_lock' => "p2m-login:ip-lock:{$ipHash}",
        ];
    }

    private function sendLockoutNotification(string $key): void
    {
        $seconds = RateLimiter::availableIn($key);
        $minutes = max(1, (int) ceil($seconds / 60));

        Notification::make()
            ->title('Terlalu banyak percobaan login')
            ->body(
                "Akses login dibatasi. Silakan coba kembali dalam {$minutes} menit."
            )
            ->danger()
            ->send();
    }
}
