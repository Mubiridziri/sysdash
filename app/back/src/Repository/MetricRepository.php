<?php

namespace App\Repository;

use App\Entity\Service;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

class MetricRepository extends EntityRepository
{
    public function getDefaultQuery(Service $service): QueryBuilder
    {
        $query = $this->createQueryBuilder('a');
        $query->where('a.service = :service')
            ->setParameter('service', $service);

        return $query;
    }
}
