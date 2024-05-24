import chalk from 'chalk';
import dedent from 'dedent-js';

export const printError = (errMessage) => {
  console.log(`${chalk.bgRed(' ERROR ')} ${errMessage}`);
};
export const printSuccess = (msg) => {
  console.log(`${chalk.bgGreen(' SUCCESS ')} ${msg}`);
};

export const printHelp = () => {
  console.log(dedent`
    ${chalk.bgCyan('  HELP  ')} 
    Без параметров - вывод погоды
    -s [CITY] установка города
    -t [API_TOKEN] установка токена
    -h вывод помощи
    `);
};

export const consoleOutput = (data) => {
  console.log(dedent`
  ${chalk.bgBlue(' Погода ')} в городе ${data.name}:
    Температура от ${data.main.temp_min} до ${data.main.temp_max}
    В небе ${data.weather[0].description}
  `);
};
