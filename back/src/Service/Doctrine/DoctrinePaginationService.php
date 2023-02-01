<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

class DoctrinePaginationService
{
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;

    private EntityManagerInterface $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function getPaginationEntries(string $entityName, int $page, int $limit, QueryBuilder $queryBuilder = null)
    {
        if($queryBuilder) {
            $query = $this->manager->getRepository($entityName)->createQueryBuilder('a');
        }

        $paginator = $this->getPaginator($query, $page, $limit);
        return [
            'entries' => $paginator->getQuery()->getResult(),
            'total' => count($paginator)
        ];
    }

    public function getPaginator(QueryBuilder $query, $page, $limit): Paginator
    {
        $offset = --$page * $limit;
        $query
            ->setFirstResult($offset)
            ->setMaxResults($limit);
        return new Paginator($query);
    }
}
