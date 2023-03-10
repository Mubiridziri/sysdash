<?php

namespace App\Controller\Builder;

use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

trait HasEditActionTrait
{
    #[Route("/{id}", methods: ['PUT'])]
    public function editAction(
        int                 $id,
        Request             $request,
        ValidatorInterface  $validator,
        SerializerInterface $serializer,
        ManagerRegistry     $managerRegistry
    ): JsonResponse
    {
        try {
            $em = $managerRegistry->getManager();
            $entity = $em->getRepository(static::getEntityName())->findOneBy(['id' => $id]);
            if(!$entity) {
                throw $this->createNotFoundException();
            }
            $entity = $serializer->deserialize(
                $request->getContent(),
                static::getEntityName(),
                'json',
                [
                    AbstractNormalizer::OBJECT_TO_POPULATE => $entity
                ] + $this->getDefaultDeserializationContext()
            );
            $errors = $validator->validate($entity);
            if ($errors->count() > 0) {
                return $this->json($errors, Response::HTTP_BAD_REQUEST);
            }
            $em->persist($entity);
            $em->flush();
            return $this->json($entity, Response::HTTP_OK, [], $this->getDefaultSerializationContext());
        } catch (NotFoundHttpException $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_NOT_FOUND);
        }
        catch (\Exception $exception) {
            return $this->json(['error' => $exception->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}