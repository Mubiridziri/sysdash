<?php

namespace App\Controller\External;

use App\Entity\Log;
use App\Entity\Metric;
use App\Entity\Service;
use App\Model\LogQueueMessageModel;
use App\Model\MetricQueueMessageModel;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api/bus/events")]
class EventController extends AbstractController
{
    #[Route("/log", methods: ['POST'])]
    public function createLog(
        SerializerInterface $serializer,
        MessageBusInterface $bus,
        ManagerRegistry     $managerRegistry,
        Request             $request
    ): JsonResponse
    {
        try {
            $event = $serializer->deserialize($request->getContent(), Log::class, 'json', [
                AbstractNormalizer::GROUPS => 'Create',
                AbstractNormalizer::ALLOW_EXTRA_ATTRIBUTES => false
            ]);
            $em = $managerRegistry->getManager();
            $service = $em->getRepository(Service::class)->findOneBy([
                'token' => $event->getServiceToken()
            ]);
            if (!$service) {
                throw $this->createNotFoundException("Invalid token");
            }

            //TODO да, в консюмере я опять соберу эту сущность, ибо мне нужно быстро отдать ответ, а затем заниматься сохранением, событиями и триггерами.
            $bus->dispatch(new LogQueueMessageModel(
                $service->getToken(),
                $event->getType(),
                $event->getMessage()
            ));
            return $this->json($event, Response::HTTP_OK, [], [
                AbstractNormalizer::GROUPS => ['View']
            ]);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route("/metric", methods: ['POST'])]
    public function createMetric(
        SerializerInterface $serializer,
        MessageBusInterface $bus,
        ManagerRegistry     $managerRegistry,
        Request             $request
    ): JsonResponse
    {
        try {
            $event = $serializer->deserialize($request->getContent(), Metric::class, 'json', [
                AbstractNormalizer::GROUPS => ['Create'],
                AbstractNormalizer::ALLOW_EXTRA_ATTRIBUTES => false
            ]);
            $em = $managerRegistry->getManager();
            $service = $em->getRepository(Service::class)->findOneBy([
                'token' => $event->getServiceToken()
            ]);
            if (!$service) {
                throw $this->createNotFoundException("Invalid token");
            }
            //TODO да, в консюмере я опять соберу эту сущность, ибо мне нужно быстро отдать ответ, а затем заниматься сохранением, событиями и триггерами.
            $bus->dispatch(new MetricQueueMessageModel(
                $service->getToken(),
                $event->getType(),
                $event->getName(),
                $event->getValue(),
                $event->getExtra()
            ));

            return $this->json($event);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
