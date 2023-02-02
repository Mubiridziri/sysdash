<?php

namespace App\Controller\External;

use App\Entity\Service;
use App\Model\LogEventModel;
use App\Model\LogQueueMessageModel;
use App\Model\MetricEventModel;
use App\Model\MetricQueueMessageModel;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api/public/v1/events")]
class EventController extends AbstractController
{
    #[Route("/log", methods: ['POST'])]
    public function createLog(SerializerInterface $serializer, MessageBusInterface $bus, ManagerRegistry $managerRegistry, Request $request): JsonResponse
    {
        $event = $serializer->deserialize($request->getContent(), LogEventModel::class, 'json');
        $em = $managerRegistry->getManager();
        $service = $em->getRepository(Service::class)->findOneBy([
            'token' => $event->getServiceToken()
        ]);
        if (!$service) {
            throw $this->createNotFoundException("Service doesnt exist in system");
        }
        $logQueueModel = new LogQueueMessageModel(
            $service->getToken(),
            $event->getType(),
            $event->getMessage()
        );

        $bus->dispatch($logQueueModel);
        return $this->json($event);
    }

    #[Route("/metric", methods: ['POST'])]
    public function createMetric(SerializerInterface $serializer, MessageBusInterface $bus, ManagerRegistry $managerRegistry, Request $request): JsonResponse
    {
        $event = $serializer->deserialize($request->getContent(), MetricEventModel::class, 'json');
        $em = $managerRegistry->getManager();
        $service = $em->getRepository(Service::class)->findOneBy([
            'token' => $event->getServiceToken()
        ]);
        if (!$service) {
            throw $this->createNotFoundException("Service doesnt exist in system");
        }
        //TODO Нельзя, чтобы модель из реквеста отправлялась в очередь, но при этом и данный подход плох
        $metricQueueModel = new MetricQueueMessageModel(
            $service->getToken(),
            $event->getType(),
            $event->getName(),
            $event->getValue(),
            $event->getExtra()
        );

        $bus->dispatch($metricQueueModel);
        return $this->json($event);
    }
}
