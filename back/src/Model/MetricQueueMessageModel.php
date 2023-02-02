<?php

namespace App\Model;

class MetricQueueMessageModel extends QueueMessageModel
{
    private string $name;

    private float $value;

    private ?array $extra;

    public function __construct(string $serviceToken, string $type, string $name, float $value, ?array $extra)
    {
        parent::__construct($serviceToken, $type);
        $this->name = $name;
        $this->value = $value;
        $this->extra = $extra;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return float
     */
    public function getValue(): float
    {
        return $this->value;
    }

    /**
     * @param float $value
     */
    public function setValue(float $value): void
    {
        $this->value = $value;
    }

    /**
     * @return array|null
     */
    public function getExtra(): ?array
    {
        return $this->extra;
    }

    /**
     * @param array|null $extra
     */
    public function setExtra(?array $extra): void
    {
        $this->extra = $extra;
    }
}
