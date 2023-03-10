<?php

namespace App\Controller;

use App\Controller\Builder\DictionaryControllerInterface;
use App\Controller\Builder\HasCreateActionTrait;
use App\Controller\Builder\HasEditActionTrait;
use App\Controller\Builder\HasListActionTrait;
use App\Controller\Builder\HasRemoveActionTrait;
use App\Controller\Builder\HasShowActionTrait;
use App\Entity\Classifier;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route("/api/v1/classifiers")]
class ClassifierController extends AbstractController implements DictionaryControllerInterface
{
    use HasListActionTrait, HasShowActionTrait, HasCreateActionTrait, HasEditActionTrait, HasRemoveActionTrait;

    public static function getEntityName(): string
    {
        return Classifier::class;
    }

    public function getDefaultSerializationContext(): array
    {
        return [AbstractNormalizer::GROUPS => ['View']];
    }

    public function getDefaultDeserializationContext(): array
    {
       return [];
    }
}
