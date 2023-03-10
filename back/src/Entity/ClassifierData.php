<?php

namespace App\Entity;

use App\Repository\ClassifierDataRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: "classifier_data")]
#[ORM\Entity(repositoryClass: ClassifierDataRepository::class)]
class ClassifierData
{
    #[ORM\Column(type: "integer")]
    #[ORM\GeneratedValue]
    #[ORM\Id]
    #[Groups(['View'])]
    private ?int $id;

    #[ORM\Column(type: "string")]
    #[Groups(['View'])]
    private string $code;

    #[ORM\Column(type: "string")]
    #[Groups(['View'])]
    private string $value;

    #[ORM\ManyToOne(targetEntity: Classifier::class)]
    private Classifier $classifier;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getCode(): string
    {
        return $this->code;
    }

    /**
     * @param string $code
     */
    public function setCode(string $code): void
    {
        $this->code = $code;
    }

    /**
     * @return string
     */
    public function getValue(): string
    {
        return $this->value;
    }

    /**
     * @param string $value
     */
    public function setValue(string $value): void
    {
        $this->value = $value;
    }

    /**
     * @return Classifier
     */
    public function getClassifier(): Classifier
    {
        return $this->classifier;
    }

    /**
     * @param Classifier $classifier
     */
    public function setClassifier(Classifier $classifier): void
    {
        $this->classifier = $classifier;
    }


}
