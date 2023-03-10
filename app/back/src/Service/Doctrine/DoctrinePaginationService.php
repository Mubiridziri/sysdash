<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\Tools\Pagination\Paginator;

class DoctrinePaginationService
{
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;

    public function getPagination(int $page, int $limit, QueryBuilder $query): array
    {
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
