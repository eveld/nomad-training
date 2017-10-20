# Scheduling Applications at Scale with Nomad
Training to be given at HashiConf EU on June 13, 2016.

```
cd nomad-training

docker run -ti -d \
  --name nomad-training \
  -p 8989:80 \
  -v $(pwd):/usr/share/nginx/html:ro \
  nginx

open http://localhost:8989
```
