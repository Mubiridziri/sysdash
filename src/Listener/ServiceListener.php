<?php

namespace App\Listener;

use App\Entity\Service;

class ServiceListener
{
    public function prePersist(Service $service)
    {
        $token = $this->generateToken();
        $service->setToken($token);
    }

    public function generateToken()
    {
        return rtrim(strtr(base64_encode(random_bytes(32)), '+/', '-_'), '=');
    }
}
