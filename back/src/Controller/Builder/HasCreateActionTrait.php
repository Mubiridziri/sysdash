<?php

namespace App\Controller\Builder;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

trait HasCreateActionTrait
{
    #[Route("", methods: ['POST'])]
    public function createAction(
        Request             $request,
        ValidatorInterface  $validator,
        SerializerInterface $serializer,
        ManagerRegistry     $managerRegistry
    ): JsonResponse
    {
        try {
            $entity = $serializer->deserialize(
                $request->getContent(),
                static::getEntityName(),
                'json',
                $this->getDefaultDeserializationContext()
            );
            $errors = $validator->validate($entity);
            if ($errors->count() > 0) {
                return $this->json($errors, Response::HTTP_BAD_REQUEST);
            }
            $em = $managerRegistry->getManager();
            $em->persist($entity);
            $em->flush();
            return $this->json($entity, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (\Exception $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}