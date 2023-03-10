<?php

namespace App\Controller;

use App\Controller\Builder\DictionaryControllerInterface;
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

#[Route("/api/v1/classifiers/data")]
class ClassifierDataController extends AbstractController implements DictionaryControllerInterface
{
    #[Route("/{classifierId}", methods: ['GET'])]
    public function listEntries(
        int $classifierId,
        DoctrineMasterEntityService $entityService,
        ManagerRegistry $managerRegistry,
        Request $request
    ): JsonResponse
    {
        $em = $managerRegistry->getManager();
        $classifier = $em->getRepository(Classifier::class)->findOneBy([
            'id' => $classifierId
        ]);
        if (!$classifier) {
            throw $this->createNotFoundException();
        }

        $query = $managerRegistry->getRepository(static::getEntityName())->getDefaultQuery($classifier);
        $classifierData = $entityService->getData(static::getEntityName(), $request, $query);
        return $this->json($classifierData, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
    }

    #[Route("/{classifierId}", methods: ['POST'])]
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
                static::getEntityName(),
                'json'
            );
            $classifierData->setClassifier($classifier);
            $em->persist($classifierData);
            $em->flush();
            return $this->json($classifierData, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    #[Route("/{classifierDataId}", methods: ['PUT'])]
    public function updateEntry(
        int                 $classifierDataId,
        ManagerRegistry     $managerRegistry,
        SerializerInterface $serializer,
        Request             $request
    ): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $classifierData = $em->getRepository(static::getEntityName())
                ->findOneBy(['id' => $classifierDataId]);
            if (!$classifierData) {
                throw $this->createNotFoundException();
            }
            $classifierData = $serializer->deserialize(
                $request->getContent(),
                static::getEntityName(),
                'json',
                [
                    AbstractNormalizer::OBJECT_TO_POPULATE => $classifierData
                ]
            );
            $em->persist($classifierData);
            $em->flush();
            return $this->json($classifierData, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }

    }

    #[Route("/{classifierDataId}", methods: ["DELETE"])]
    public function removeEntry(int $classifierDataId, ManagerRegistry $managerRegistry): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $classifierData = $em->getRepository(static::getEntityName())->findOneBy(['id' => $classifierDataId]);
            if (!$classifierData) {
                throw $this->createNotFoundException();
            }
            $em->remove($classifierData);
            $em->flush();
            return $this->json($classifierData, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        } catch (\Exception $exception) {
            return $this->json(['error' => "Internal server error"], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public static function getEntityName(): string
    {
        return ClassifierData::class;
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