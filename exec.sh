#!/bin/bash

function ProgressBar {
# Process data
  let _progress=(${1}*100/${2}*100)/100
  let _done=(${_progress}*4)/10
  let _left=40-$_done
  
  _fill=$(printf "%${_done}s")
  _empty=$(printf "%${_left}s")

  printf "${3} : [${_fill// /#}${_empty// /-}] ${_progress}%%\n"
}

generate_bookshelf() {
  echo "[]" > bookshelf.json

  for i in $(seq 100); do
    node src/Bookshelf
    clear
    ProgressBar ${i} 100 "Gerando dados do Bookshelf"
  done;
  echo -e "Dados do Bookshelf foram gerados\n"
}

generate_bookshelf