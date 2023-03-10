<?php

namespace App\Controller;

use App\Controller\Builder\DictionaryControllerInterface;
use App\Controller\Builder\HasCreateActionTrait;
use App\Controller\Builder\HasEditActionTrait;
use App\Controller\Builder\HasListActionTrait;
use App\Controller\Builder\HasRemoveActionTrait;
use App\Controller\Builder\HasShowActionTrait;
use App\Entity\Service;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route("/api/v1/services")]
class ServiceController extends AbstractController implements DictionaryControllerInterface
{
    use HasListActionTrait, HasShowActionTrait, HasCreateActionTrait, HasEditActionTrait, HasRemoveActionTrait;

    public static function getEntityName(): string
    {
        return Service::class;
    }

    public function getDefaultSerializationContext(): array
    {
       return [];
    }

    public function getDefaultDeserializationContext(): array
    {
        return [
            AbstractNormalizer::GROUPS => ['Edit']
        ];
    }
}
