<?php

namespace App\Listener;

use App\Entity\ODM\Event;
use App\Entity\Service;
use Doctrine\Bundle\MongoDBBundle\ManagerRegistry;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class MessageHandler
{
    private EntityManagerInterface $manager;

    private ManagerRegistry $mongoManager;

    public function __construct(EntityManagerInterface $manager, ManagerRegistry $mongoManager)
    {
        $this->manager = $manager;
        $this->mongoManager = $mongoManager;
    }

    public function __invoke(Event $message): void
    {
        $service = $this->manager->getRepository(Service::class)->findOneBy([
            'token' => $message->getServiceToken()
        ]);

        //Skip message when doesn't exist service
        if(!$service) {
            return;
        }

        $mongoManager = $this->mongoManager->getManager();
        $mongoManager->persist($message);
        $mongoManager->flush();
    }
}
