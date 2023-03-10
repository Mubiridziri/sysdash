<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: "logs")]
#[ORM\Entity(repositoryClass: 'App\Repository\LogRepository')]
class Log
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
    private string $message;

    #[ORM\Column(type: 'string')]
    #[Groups(['View', 'Create'])]
    private string $type;

    #[ORM\Column(type: "datetime", nullable: true)]
    #[Groups(['View'])]
    private \DateTime $createdAt;


    public function __construct()
    {
        $this->createdAt = new \DateTime();
    }

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
     * @return \DateTime
     */
    public function getCreatedAt(): \DateTime
    {
        return $this->createdAt;
    }

    /**
     * @param \DateTime $createdAt
     */
    public function setCreatedAt(\DateTime $createdAt): void
    {
        $this->createdAt = $createdAt;
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
