<?php

namespace App\Controller;

use App\Entity\Classifier;
use App\Entity\ClassifierData;
use App\Service\Doctrine\DoctrineMasterEntityService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

#[Route("/api/v1/classifiers")]
class ClassifierController extends AbstractController
{
    #[Route("", methods: ["GET"])]
    public function list(DoctrineMasterEntityService $entityService, Request $request): JsonResponse
    {
        return $this->json($entityService->getData(Classifier::class, $request));
    }

    #[Route("", methods: ["POST"])]
    public function create(
        SerializerInterface $serializer,
        ManagerRegistry     $managerRegistry,
        Request             $request
    ): JsonResponse
    {
        try {
            $service = $serializer->deserialize($request->getContent(), Classifier::class, 'json', [
                AbstractNormalizer::GROUPS => ['Create']
            ]);
            $em = $managerRegistry->getManager();
            $em->persist($service);
            $em->flush();
            return $this->json($service);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route("/{classifierId}", methods: ["PUT"])]
    public function update(
        int                 $classifierId,
        SerializerInterface $serializer,
        ManagerRegistry     $managerRegistry,
        Request             $request
    ): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $service = $em->getRepository(Classifier::class)->findOneBy(['id' => $classifierId]);
            if (!$service) {
                throw $this->createNotFoundException();
            }
            $service = $serializer->deserialize($request->getContent(), Classifier::class, 'json', [
                AbstractNormalizer::OBJECT_TO_POPULATE => $service,
                AbstractNormalizer::GROUPS => ['Edit']
            ]);

            $em->persist($service);
            $em->flush();
            return $this->json($service);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route("/data/{classifierId}", methods: ['GET'])]
    public function listEntries(
        int $classifierId,
        DoctrineMasterEntityService $entityService,
        ManagerRegistry $managerRegistry,
        Request $request
    )
    {
        $em = $managerRegistry->getManager();
        $classifier = $em->getRepository(Classifier::class)->findOneBy([
            'id' => $classifierId
        ]);
        if (!$classifier) {
            throw $this->createNotFoundException();
        }

        $query = $managerRegistry->getRepository(ClassifierData::class)->getDefaultQuery($classifier);
        $classifierData = $entityService->getData(ClassifierData::class, $request, $query);
        return $this->json($classifierData, Response::HTTP_OK, [], [
            AbstractNormalizer::GROUPS => ['View']
        ]);
    }

    #[Route("/data/{classifierId}", methods: ['POST'])]
    public function createEntry(
        int                 $classifierId,
        ManagerRegistry     $managerRegistry,
        SerializerInterface $serializer,
        Request             $request
    ): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $classifier = $em->getRepository(Classifier::class)->findOneBy(['id' => $classifierId]);
            if (!$classifier) {
                throw $this->createNotFoundException();
            }
            $classifierData = $serializer->deserialize(
                $request->getContent(),
                ClassifierData::class,
                'json',
                [AbstractNormalizer::GROUPS => ['Create']]
            );
            $classifierData->setClassifier($classifier);
            $em->persist($classifierData);
            $em->flush();
            return $this->json($classifierData, Response::HTTP_OK, [], [
                AbstractNormalizer::GROUPS => ['View']
            ]);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    #[Route("/data/{classifierDataId}", methods: ['PUT'])]
    public function updateEntry(
        int                 $classifierDataId,
        ManagerRegistry     $managerRegistry,
        SerializerInterface $serializer,
        Request             $request
    ): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $classifierData = $em->getRepository(ClassifierData::class)
                ->findOneBy(['id' => $classifierDataId]);
            if (!$classifierData) {
                throw $this->createNotFoundException();
            }
            $classifierData = $serializer->deserialize(
                $request->getContent(),
                ClassifierData::class,
                'json',
                [
                    AbstractNormalizer::OBJECT_TO_POPULATE => $classifierData,
                    AbstractNormalizer::GROUPS => ['Edit']
                ]
            );
            $em->persist($classifierData);
            $em->flush();
            return $this->json($classifierData, Response::HTTP_OK, [], [
                AbstractNormalizer::GROUPS => ['View']
            ]);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    #[Route("/data/{classifierId}", methods: ["DELETE"])]
    public function removeEntry(int $classifierDataId, ManagerRegistry $managerRegistry): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $classifierData = $em->getRepository(ClassifierData::class)->findOneBy(['id' => $classifierDataId]);
            if (!$classifierData) {
                throw $this->createNotFoundException();
            }
            $em->remove($classifierData);
            $em->flush();
            return $this->json($classifierData);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route("/{classifierId}", methods: ["DELETE"])]
    public function remove(int $classifierId, ManagerRegistry $managerRegistry): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $classifier = $em->getRepository(Classifier::class)->findOneBy(['id' => $classifierId]);
            if (!$classifier) {
                throw $this->createNotFoundException();
            }
            $em->remove($classifier);
            $em->flush();
            return $this->json($classifier);
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}