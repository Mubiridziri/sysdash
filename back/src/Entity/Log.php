<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: "events")]
#[ORM\Entity(repositoryClass: 'App\Repository\LogRepository')]
class Log
{
    const ERROR = 'error';
    const INFO = 'info';
    const DEBUG = 'debug';

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['View'])]
    private ?int $id;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\Service')]
    private Service $service;

    #[ORM\Column(type: 'text')]
    #[Groups(['View'])]
    private string $message;

    #[ORM\Column(type: 'string')]
    #[Groups(['View'])]
    private string $type;

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
}
