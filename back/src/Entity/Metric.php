<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: 'metrics')]
#[ORM\Entity(repositoryClass: 'App\Repository\MetricRepository')]
class Metric
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['View'])]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\Service')]
    private Service $service;

    #[Groups(['View', 'Create'])]
    private ?string $serviceToken;

    #[ORM\Column(type: 'text')]
    #[Groups(['View', 'Create'])]
    private string $name;

    #[ORM\Column(type: 'float')]
    #[Groups(['View', 'Create'])]
    private ?float $value;

    #[ORM\Column(type: 'string')]
    #[Groups(['View', 'Create'])]
    private string $type;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['View', 'Create'])]
    private ?array $extra;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param int|null $id
     */
    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return Service
     */
    public function getService(): Service
    {
        return $this->service;
    }

    /**
     * @param Service $service
     */
    public function setService(Service $service): void
    {
        $this->service = $service;
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

    /**
     * @return ?array
     */
    public function getExtra(): ?array
    {
        return $this->extra;
    }

    /**
     * @param ?array $extra
     */
    public function setExtra(?array $extra): void
    {
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
     * @return float|null
     */
    public function getValue(): ?float
    {
        return $this->value;
    }

    /**
     * @param float|null $value
     */
    public function setValue(?float $value): void
    {
        $this->value = $value;
    }

    /**
     * @return string|null
     */
    public function getServiceToken(): ?string
    {
        return $this->serviceToken ?? $this->service->getToken();
    }

    /**
     * @param string|null $serviceToken
     */
    public function setServiceToken(?string $serviceToken): void
    {
        $this->serviceToken = $serviceToken;
    }
}
