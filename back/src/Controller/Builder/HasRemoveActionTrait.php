<?php

namespace App\Controller\Builder;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

trait HasRemoveActionTrait
{
    #[Route("/{id}", methods: ['DELETE'])]
    public function removeAction(int $id, ManagerRegistry $managerRegistry): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $entity = $em->getRepository(static::getEntityName())->findOneBy(['id' => $id]);
            if(!$entity) {
                throw $this->createNotFoundException();
            }
            $em->remove($entity);
            $em->flush();
            return $this->json($entity, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (\Exception $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}