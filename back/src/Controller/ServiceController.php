<?php

namespace App\Controller;

use App\Entity\Service;
use App\Service\Doctrine\DoctrinePaginationService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api/v1/services")]
class ServiceController extends AbstractController
{
    #[Route("", methods: ["GET"])]
    public function list(ManagerRegistry $managerRegistry, DoctrinePaginationService $paginationService, Request $request): JsonResponse
    {
        $page = $request->query->get('page', DoctrinePaginationService::DEFAULT_PAGE);
        $limit = $request->query->get('limit', DoctrinePaginationService::DEFAULT_LIMIT);
        return $this->json($paginationService->getPaginationEntries(Service::class, $page, $limit));
    }

    #[Route("", methods: ["POST"])]
    public function create(SerializerInterface $serializer, ManagerRegistry $managerRegistry, Request $request): JsonResponse
    {
        $service = $serializer->deserialize($request->getContent(), Service::class, 'json');
        $em = $managerRegistry->getManager();
        $em->persist($service);
        $em->flush();
        return $this->json($service);
    }

    #[Route("/{serviceId}", methods: ["PUT"])]
    public function update(int $serviceId, SerializerInterface $serializer, ManagerRegistry $managerRegistry, Request $request): JsonResponse
    {
        $em = $managerRegistry->getManager();
        $service = $em->getRepository(Service::class)->findOneBy(['id' => $serviceId]);
        if (!$service) {
            throw $this->createNotFoundException();
        }
        $service = $serializer->deserialize($request->getContent(), Service::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $service,
            AbstractNormalizer::GROUPS => ['Edit']
        ]);

        $em->persist($service);
        $em->flush();
        return $this->json($service);
    }

    #[Route("/{serviceId}", methods: ["DELETE"])]
    public function remove(int $serviceId, ManagerRegistry $managerRegistry): JsonResponse
    {
        $em = $managerRegistry->getManager();
        $service = $em->getRepository(Service::class)->findOneBy(['id' => $serviceId]);
        if (!$service) {
            throw $this->createNotFoundException();
        }
        $em->remove($service);
        $em->flush();
        return $this->json($service);
    }
}
