#!/usr/bin/env bash

(cd back && composer install && bin/console cache:clear --env=prod)
(npm install && npm run build)

if back/bin/console doctrine:migration:status | grep -E -i '^\|\s+\|\s+Current\s+\|\s+0'; then
  sh back/deploy.sh
  else
    back/bin/console doctrine:migrations:migrate -n
fi

echo "----------------------------------------"
echo -e 'Starting complete!'
echo "----------------------------------------"
exec "$@"
