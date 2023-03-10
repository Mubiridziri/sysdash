<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\QueryBuilder;

class DoctrineQueryHelper
{

    /**
     * @param string $field
     * @param $value
     * @param QueryBuilder $queryBuilder
     * @return void
     */
    public static function equal(string $field, $value, QueryBuilder $queryBuilder, $alias = 'a')
    {
        $param = sprintf('%sField', $field);
        $queryBuilder->andWhere(sprintf('%s.%s = :%s', $alias, $field, $param));
        $queryBuilder->setParameter($param, $value);
    }

    /**
     * @param string $field
     * @param string $value
     * @param QueryBuilder $queryBuilder
     * @param $strict
     * @return void
     */
    public static function like(string $field, string $value, QueryBuilder $queryBuilder, $strict = true, $alias = 'a')
    {
        $expr = $queryBuilder->expr();
        $normalizedValue = mb_strtolower($value);
        $normalizedValue = "%$normalizedValue%";
        $param = uniqid("field");
        if ($strict) {
            $normalizedValue = strtolower($normalizedValue);
            $queryBuilder->andWhere(
                $expr->like(
                    sprintf('LOWER(%s.%s)', $alias, $field),
                    sprintf(':%s', $param)
                )
            );
        } else {
            $queryBuilder->orWhere($expr->like($field, sprintf(':%s', $param)));
        }
        $queryBuilder->setParameter($param, $normalizedValue);

    }

    /**
     * @param string $field
     * @param array $value
     * @param QueryBuilder $queryBuilder
     * @return void
     * @throws \Exception
     */
    public static function dateRange(string $field, array $value, QueryBuilder $queryBuilder, $alias = 'a')
    {
        $date1 = sprintf('%sStart', $field);
        $date2 = sprintf('%sEnd', $field);
        if(isset($value['start'])) {
            $startDate = $value['start'] ? new \DateTime($value['start']) : new \DateTime();
            $queryBuilder->andWhere(sprintf('%s.%s >= :%s', $alias, $field, $date1));
            $queryBuilder->setParameter($date1, $startDate);
        }
        if(isset($value['end'])) {
            $endDate = $value['end'] ? new \DateTime($value['end']) : new \DateTime();
            $queryBuilder->andWhere(sprintf('%s.%s <= :%s', $alias, $field, $date2));
            $queryBuilder->setParameter($date2, $endDate);
        }
    }

    public static function isNull(string $field, QueryBuilder $queryBuilder, $alias = 'a')
    {
        $expr = $queryBuilder->expr();
        $queryBuilder->andWhere($expr->isNull(sprintf('%s.%s', $alias, $field)));
    }

    public static function isNotNull(string $field, QueryBuilder $queryBuilder, $alias = 'a')
    {
        $expr = $queryBuilder->expr();
        $queryBuilder->andWhere($expr->isNotNull(sprintf('%s.%s', $alias, $field)));
    }

}