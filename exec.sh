#!/bin/bash

TEST_NUMBER_EXEC=100


function ProgressBar {
  let _progress=(${1}*100/${2}*100)/100
  let _done=(${_progress}*4)/10
  let _left=40-$_done
  
  _fill=$(printf "%${_done}s")
  _empty=$(printf "%${_left}s")

  printf "${3} : [${_fill// /#}${_empty// /-}] ${_progress}%%\n"
}

generate_data() {
  NAME=${1};
  FILENAME="${1,,}"

  echo "[]" > ${FILENAME}.json

  for i in $(seq ${TEST_NUMBER_EXEC}); do
    node src/${NAME}
    clear
    ProgressBar ${i} TEST_NUMBER_EXEC "Gerando dados do ${NAME}"
  done;
  echo -e "Dados do ${NAME} foram gerados\n"
}

generate_data "Bookshelf";
generate_data "Objection";
generate_data "Sequelize";

# gerar graficos
clear
echo "Gerando gráficos..."

node graph.js
clear

echo "Gráficos gerados"
