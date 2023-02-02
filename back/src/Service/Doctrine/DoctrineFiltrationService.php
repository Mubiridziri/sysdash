<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\QueryBuilder;

class DoctrineFiltrationService
{
    /**
     * @var EntityManagerInterface
     */
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    const STRING_TYPE = 'string';
    const TEXT_TYPE = 'text';
    const INTEGER_TYPE = 'integer';
    const FLOAT_TYPE = 'float';
    const DATETIME_TYPE = 'datetime';
    const BOOLEAN_TYPE = 'boolean';
    const IS_NULL_TYPE = 'null';
    const IS_NOT_NULL_TYPE = 'notnull';

    /**
     * @param $entityName
     * @param array $where
     * @param QueryBuilder $queryBuilder
     * @return QueryBuilder
     * @throws \Doctrine\ORM\Mapping\MappingException
     */
    public function filter($entityName, array $where, QueryBuilder $queryBuilder)
    {
        $metadata = $this->em->getClassMetadata($entityName);

        foreach ($where as $fieldName => $value) {
            if(!in_array($value, [self::IS_NOT_NULL_TYPE, self::IS_NULL_TYPE])) {
                if(in_array($fieldName, $metadata->getAssociationNames())) {
                    $fieldMetadata['type'] = self::INTEGER_TYPE;
                } else {
                    $fieldMetadata = $metadata->getFieldMapping($fieldName);
                }
            } else $fieldMetadata['type'] = $value;

            $fieldType = $fieldMetadata['type'];
            switch ($fieldType) {
                case self::STRING_TYPE:
                case self::TEXT_TYPE:
                    DoctrineQueryHelper::like($fieldName, $value, $queryBuilder);
                    break;
                case self::INTEGER_TYPE:
                case self::FLOAT_TYPE:
                case self::BOOLEAN_TYPE:
                    DoctrineQueryHelper::equal($fieldName, $value, $queryBuilder);
                    break;
                case self::DATETIME_TYPE:
                    DoctrineQueryHelper::dateRange($fieldName, $value, $queryBuilder);
                    break;
                case self::IS_NOT_NULL_TYPE:
                    DoctrineQueryHelper::isNotNull($fieldName, $queryBuilder);
                    break;
                case self::IS_NULL_TYPE:
                    DoctrineQueryHelper::isNull($fieldName, $queryBuilder);
                    break;
                default:
                    break;
            }
        }

        return $queryBuilder;
    }

}
