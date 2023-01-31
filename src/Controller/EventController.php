<?php

namespace App\Controller;

use App\Entity\ODM\Event;
use App\Entity\Service;
use Doctrine\Bundle\MongoDBBundle\ManagerRegistry as MongoRegistry;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route("/api/v1/events")]
class EventController extends AbstractController
{
    #[Route("/{serviceId}", methods: ["GET"])]
    public function list(int $serviceId, MongoRegistry $mongoRegistry, ManagerRegistry $managerRegistry): JsonResponse
    {
        $mongoManager = $mongoRegistry->getManager();
        $doctrineManager = $managerRegistry->getManager();
        $service = $doctrineManager->getRepository(Service::class)->findOneBy([
            'id' => $serviceId
        ]);
        if(!$service) {
            throw $this->createNotFoundException();
        }

        $events = $mongoManager->getRepository(Event::class)->findBy([
            'serviceToken' => $service->getToken()
        ]);
        return $this->json($events);
    }
}
