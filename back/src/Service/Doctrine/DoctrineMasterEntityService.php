<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;
use Symfony\Component\HttpFoundation\Request;

class DoctrineMasterEntityService
{
    private DoctrineFiltrationService $filtrationService;
    private DoctrineSortingService $sortingService;
    private DoctrinePaginationService $paginationService;
    private EntityManagerInterface $em;

    public function __construct(
        DoctrineFiltrationService $filtrationService,
        DoctrineSortingService    $sortingService,
        DoctrinePaginationService $paginationService,
        EntityManagerInterface    $em
    )
    {
        $this->filtrationService = $filtrationService;
        $this->sortingService = $sortingService;
        $this->paginationService = $paginationService;
        $this->em = $em;
    }

    public function getData(string $entityName, Request $request, QueryBuilder $queryBuilder = null): array
    {
        if (null === $queryBuilder) {
            $queryBuilder = $this->em->getRepository($entityName)->createQueryBuilder('a');
        }
        //Filtration
        $where = $request->get('where', []);
        $this->filtrationService->filter($entityName, $where, $queryBuilder);
        //Sorting
        $sort = $request->get('sort', DoctrineSortingService::DESC_SORT);
        $column = $request->get('column', 'id');
        $this->sortingService->sort($column, $sort, $queryBuilder);
        //Pagination
        $page = $request->get('page', DoctrinePaginationService::DEFAULT_PAGE);
        $limit = $request->get('limit', DoctrinePaginationService::DEFAULT_LIMIT);

        return $this->paginationService->getPagination($page, $limit, $queryBuilder);
    }
}
