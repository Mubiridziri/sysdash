<?php

namespace App\Listener;

use App\Entity\Log;
use App\Entity\Metric;
use App\Entity\Service;
use App\Model\LogQueueMessageModel;
use App\Model\MetricQueueMessageModel;
use App\Model\QueueMessageModel;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Messenger\Attribute\AsMessageHandler;

#[AsMessageHandler]
class MessageHandler
{
    private EntityManagerInterface $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function __invoke(QueueMessageModel $message): void
    {
        $service = $this->manager->getRepository(Service::class)->findOneBy([
            'token' => $message->getServiceToken()
        ]);

        //Skip message when doesn't exist service
        if(!$service) {
            return;
        }
        //TODO dispatch события для навешивания триггеров
        if($message instanceof LogQueueMessageModel) {
            $log = new Log();
            $log->setMessage($message->getMessage());
            $log->setType($message->getType());
            $log->setService($service);
            $this->manager->persist($log);
        }
        //Подразумеваем, что набор полей в будущем будет координально отличаться
        if($message instanceof MetricQueueMessageModel) {
            $metric = new Metric();
            $metric->setName($message->getName());
            $metric->setService($service);
            $metric->setType($message->getType());
            $metric->setValue($message->getValue());
            $metric->setExtra($message->getExtra());
            $this->manager->persist($metric);
        }

        $this->manager->flush();
    }
}
