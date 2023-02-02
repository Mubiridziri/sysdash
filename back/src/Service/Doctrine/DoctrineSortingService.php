<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\QueryBuilder;

class DoctrineSortingService
{
    const DESC_SORT = 'desc';
    const ASC_SORT = 'asc';

    public function sort(string $column, string $destination, QueryBuilder $queryBuilder)
    {
        if(!in_array(strtolower($destination), [self::DESC_SORT, self::ASC_SORT])) {
            throw new \UnexpectedValueException("Не корректное направление сортировки $destination для $column");
        }
        $queryBuilder->orderBy("a.$column", $destination);
        return $queryBuilder;
    }
}
