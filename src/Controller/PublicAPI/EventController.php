<?php

namespace App\Controller\PublicAPI;

use App\Entity\ODM\Event;
use App\Entity\Service;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api/v1/public/events")]
class EventController extends AbstractController
{
    #[Route("", methods: ['POST'])]
    public function event(SerializerInterface $serializer, MessageBusInterface $bus, ManagerRegistry $managerRegistry, Request $request): JsonResponse
    {
        $event = $serializer->deserialize($request->getContent(), Event::class, 'json');
        $em = $managerRegistry->getManager();
        $service = $em->getRepository(Service::class)->findOneBy([
            'token' => $event->getServiceToken()
        ]);
        if(!$service) {
            throw $this->createNotFoundException("Service doesnt exist in system");
        }
        $bus->dispatch($event);
        return $this->json($event);
    }
}
