<?php

namespace App\Model;

class QueueMessageModel
{

    private string $serviceToken;

    private string $message;

    private string $type;

    public function __construct(string $serviceToken, string $type)
    {
        $this->serviceToken = $serviceToken;
        $this->type = $type;
    }

    /**
     * @return string
     */
    public function getServiceToken(): string
    {
        return $this->serviceToken;
    }

    /**
     * @param string $serviceToken
     */
    public function setServiceToken(string $serviceToken): void
    {
        $this->serviceToken = $serviceToken;
    }

    /**
     * @return string
     */
    public function getType(): string
    {
        return $this->type;
    }

    /**
     * @param string $type
     */
    public function setType(string $type): void
    {
        $this->type = $type;
    }
}
