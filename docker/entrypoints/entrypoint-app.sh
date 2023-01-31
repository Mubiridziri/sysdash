#!/usr/bin/env bash

composer install && bin/console cache:clear --env=prod

if bin/console doctrine:migration:status | grep -E -i '^\|\s+\|\s+Current\s+\|\s+0'; then
  sh deploy.sh
  else
    bin/console doctrine:migrations:migrate -n
fi

echo "----------------------------------------"
echo -e 'Starting complete!'
echo "----------------------------------------"
exec "$@"
