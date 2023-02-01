<?php

namespace App\Repository;

use App\Entity\Log;
use App\Entity\Service;
use App\Service\Doctrine\DoctrinePaginationService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class LogRepository extends ServiceEntityRepository
{
    private DoctrinePaginationService $paginator;

    public function __construct(ManagerRegistry $managerRegistry, DoctrinePaginationService $paginator)
    {
        parent::__construct($managerRegistry, Log::class);
        $this->paginator = $paginator;
    }

    public function getPaginatedLogs(Service $service, int $page, int $limit): array
    {
        $query = $this->createQueryBuilder('a');
        $query->andWhere('a.service = :service')
            ->setParameter('service', $service);

        return $this->paginator->getPaginationEntries(Log::class, $page, $limit, $query);
    }
}