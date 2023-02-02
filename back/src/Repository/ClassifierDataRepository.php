<?php

namespace App\Repository;

use App\Entity\Classifier;
use Doctrine\ORM\EntityRepository;

class ClassifierDataRepository extends EntityRepository
{
    public function getDefaultQuery(Classifier $classifier)
    {
        $query = $this->createQueryBuilder('a');
        $query->andWhere('a.classifier = :classifier')
            ->setParameter('classifier', $classifier);

        return $query;
    }
}