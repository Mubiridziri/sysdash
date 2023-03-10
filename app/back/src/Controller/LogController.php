<?php

namespace App\Controller;

use App\Controller\Builder\DictionaryControllerInterface;
use App\Entity\Log;
use App\Entity\Service;
use App\Service\Doctrine\DoctrineMasterEntityService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;

#[Route("/api/v1/logs")]
class LogController extends AbstractController implements DictionaryControllerInterface
{
    #[Route("/{serviceId}", methods: ["GET"])]
    public function list(
        int                         $serviceId,
        ManagerRegistry             $managerRegistry,
        DoctrineMasterEntityService $entityService,
        Request                     $request
    ): JsonResponse
    {
        $doctrineManager = $managerRegistry->getManager();
        $service = $doctrineManager->getRepository(Service::class)->findOneBy([
            'id' => $serviceId
        ]);
        if (!$service) {
            throw $this->createNotFoundException();
        }

        $query = $managerRegistry->getRepository(static::getEntityName())->getDefaultQuery($service);
        $logs = $entityService->getData(Log::class, $request, $query);
        return $this->json($logs, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
    }

    public static function getEntityName(): string
    {
        return Log::class;
    }

    public function getDefaultSerializationContext(): array
    {
        return [
            AbstractNormalizer::GROUPS => ['View']
        ];
    }

    public function getDefaultDeserializationContext(): array
    {
        return [];
    }
}
