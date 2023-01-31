<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class ArchiveDataCommand extends Command
{
    protected static $defaultName = "app:archive:all";

    protected function execute(InputInterface $input, OutputInterface $output)
    {
        //TODO archiving data when createdAt > value in settings table
    }
}