<?php

namespace App\Model;

class QueueMessageModel
{

    private string $serviceToken;

    private string $message;

    private string $type;

    public function __construct(string $serviceToken, string $message, string $type)
    {
        $this->serviceToken = $serviceToken;
        $this->message = $message;
        $this->type = $type;
    }

    /**
     * @return mixed
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * @param mixed $message
     */
    public function setMessage($message): void
    {
        $this->message = $message;
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