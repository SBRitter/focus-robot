#!/bin/bash
for i in {1..30}
do
  python random_focus.py "data-files/$i".txt
done
