#!/bin/bash

IP_DO_SERVIDOR=172.16.254.9
PASTA_DE_BACKUP=/opt/omnia/bkp
NOME_DO_CONTAINER=omniadb
NOME_DO_BANCO=omniadb
USUARIO_DO_BANCO=postgres

echo "Gerando DDL"
ssh root@$IP_DO_SERVIDOR "cd $PASTA_DE_BACKUP && pg_dump  -U $USUARIO_DO_BANCO --no-owner --schema-only $NOME_DO_BANCO > $NOME_DO_BANCO-schema.sql" || exit;
echo

echo "Gerando backup"
ssh root@$IP_DO_SERVIDOR \
  "cd $PASTA_DE_BACKUP &&
    pg_dump -U $USUARIO_DO_BANCO \
    --disable-triggers \
    --data-only \
    --exclude-table=cfg0012 \
    --exclude-table=con0001 \
    --exclude-table=con0002 \
    --exclude-table=con0003 \
    --exclude-table=con0004 \
    --exclude-table=con0005 \
    --exclude-table=con0006 \
    --exclude-table=con0007 \
    --exclude-table=con0008 \
    --exclude-table=con0009 \
    --exclude-table=con0010 \
    --exclude-table=fat0001 \
    --exclude-table=fis0013 \
    --exclude-table=fis0014 \
    --exclude-table=fin0001 \
    --exclude-table=fin0002 \
    --exclude-table=fin0005 \
    --exclude-table=fin0007 \
    --exclude-table=fin0010 \
    --exclude-table=log0016 \
    --exclude-table=rc_sales_dw \
    --exclude-table=rc_omnia_xml \
    --exclude-table=rc_omnia_xml_completo \
    --exclude-table=rc_omnia_xml_cte \
    --exclude-table=rc_omnia_xml_evento_completo \
    --exclude-table=rc_omnia_xml_evento_cte \
    --exclude-table=rc_omnia_xml_evento_resumido \
    --exclude-table=rc_omnia_xml_evento_solicitado_pelo_omnia \
    --exclude-table=rc_omnia_xml_item \
    --exclude-table=rc_omnia_xml_resumido \
    --exclude-table=rep0038 \
    --exclude-table=rep0039 \
    --exclude-table=sal0002 \
    --exclude-table=sal0003 \
    --exclude-table=sal0004 \
    --exclude-table=sal0014 \
    --exclude-table=sal0018 \
    --exclude-table=sal0022 \
    --exclude-table=sal0028 \
    --exclude-table=sal0037 \
    --exclude-table=sal0038 \
    --exclude-table=sal0039 \
    --exclude-table=sal0040 \
    $NOME_DO_BANCO > data.sql" || exit;
echo

echo "Baixando backup"
scp root@$IP_DO_SERVIDOR:$PASTA_DE_BACKUP/*.sql ./../dbcontainer/ || exit
ssh root@$IP_DO_SERVIDOR "cd $PASTA_DE_BACKUP && rm -f *" || exit;
echo

echo "Parando container $NOME_DO_CONTAINER"
docker stop $NOME_DO_CONTAINER

echo "Removendo container $NOME_DO_CONTAINER"
docker rm $NOME_DO_CONTAINER

echo "Levantando container $NOME_DO_CONTAINER"
docker run -d --name $NOME_DO_CONTAINER -e POSTGRES_USER=rcosta -e POSTGRES_PASSWORD=rcosta -e POSTGRES_DB=$NOME_DO_BANCO -v `pwd -W`/../dbcontainer:/opt -p 5432:5432 postgres:10.18 || exit

echo "Entrando no container"
echo "Execute os comandos abaixo"
echo "cd /opt && ./executar-sqls.sh"

docker exec -it $NOME_DO_CONTAINER bash