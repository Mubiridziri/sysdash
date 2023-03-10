<?php

namespace App\Controller\Builder;

use App\Doctrine\DoctrineMasterEntityService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

trait HasListActionTrait
{
    #[Route("", methods: ['GET'])]
    public function listAction(DoctrineMasterEntityService $entityService, Request $request): JsonResponse
    {
        $data = $entityService->getData(static::getEntityName(), $request);
        return $this->json($data, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
    }
}