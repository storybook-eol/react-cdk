echo "=> Transpiling `src` into ES5 .."
rm -rf ./dist
./node_modules/.bin/babel --ignore __tests__ --plugins "transform-runtime" ./src --out-dir ./dist
echo "=> Transpiling completed."
