<?php

namespace App\Model;

class EventModel
{
    private string $serviceToken;

    private string $message;

    private string $type;

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
    public function getMessage(): string
    {
        return $this->message;
    }

    /**
     * @param string $message
     */
    public function setMessage(string $message): void
    {
        $this->message = $message;
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