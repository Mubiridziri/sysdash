<?php

namespace App\Controller\Builder;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

trait HasShowActionTrait
{

    #[Route("/{id}", methods: ['GET'])]
    public function showAction(int $id, ManagerRegistry $managerRegistry): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $entity = $em->getRepository(static::getEntityName())->findOneBy(['id' => $id]);
            if(!$entity) {
                throw $this->createNotFoundException();
            }
            return $this->json($entity, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage(), Response::HTTP_NOT_FOUND]);
        } catch (\Exception $exception) {
            return $this->json(['error' => $exception->getMessage(), Response::HTTP_BAD_REQUEST]);
        }
    }
}