<?php

namespace App\Model;

class LogQueueMessageModel extends QueueMessageModel
{
    private string $message;

    public function __construct(string $serviceToken, string $type, string $message)
    {
        parent::__construct($serviceToken, $type);
        $this->message = $message;
    }

    /**
     * @return mixed
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
}
