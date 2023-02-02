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
}
