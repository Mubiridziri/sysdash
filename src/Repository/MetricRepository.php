<?php

namespace App\Repository;

use App\Entity\Metric;
use App\Entity\Service;
use App\Service\Doctrine\DoctrinePaginationService;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Mapping\ClassMetadata;
use Doctrine\Persistence\ManagerRegistry;

class MetricRepository extends ServiceEntityRepository
{
    private DoctrinePaginationService $paginator;

    public function __construct(ManagerRegistry $managerRegistry, DoctrinePaginationService $paginator)
    {
        parent::__construct($managerRegistry, Metric::class);
        $this->paginator = $paginator;
    }

    public function getPaginatedLogs(Service $service, int $page, int $limit): array
    {
        $query = $this->createQueryBuilder('a');
        $query->where('a.service = :service')
            ->setParameter('service', $service);

        return $this->paginator->getPaginationEntries(Metric::class, $page, $limit);
    }
}