<?php

namespace App\Controller\Builder;

interface DictionaryControllerInterface
{
    public static function getEntityName(): string;

    public function getDefaultSerializationContext(): array;
    public function getDefaultDeserializationContext(): array;
}