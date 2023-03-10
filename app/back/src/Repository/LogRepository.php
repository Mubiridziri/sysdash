<?php

namespace App\Repository;

use App\Entity\Service;
use Doctrine\ORM\EntityRepository;

class LogRepository extends EntityRepository
{
    public function getDefaultQuery(Service $service)
    {
        $query = $this->createQueryBuilder('a');
        $query->andWhere('a.service = :service')
            ->setParameter('service', $service);

        return $query;
    }
}
