
global._currentCity = 'Curitiba';
global._lastTemperature = '';
global._lastForecastUpdate = '';

// o refresh dos dados (milisecondsToRefresh) tem que ser 1 segundo mais demorado do que o refresh da barra de countdown (milisecondsToCountDown)
// porque a barra de countdown tem que aguardar 1 segundo mesmo após ter chegado no ZERO!
// se 'milisecondsToRefresh' nao for 1 segundo a mais, a tela é atualizada quando a barra countdown (milisecondsToCountDown) esta em 1 SEGUNDO, visualmente fica estranho
global.milisecondsToRefresh = 6000;
global.milisecondsToCountDown = 5000;

global.countDown = global.milisecondsToRefresh/1000;
global.countDownWidth = '100%';

global.countDownProcess = null;
//global.fetchForecastsProcess = null;


