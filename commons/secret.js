module.exports = {
    'secret' :  '',
    'db_info': {
      local: { // localhost
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'codus9601',
        database: 'tmt'
      },
      real: { // real
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      },
      dev: { // dev
        host: '',
        port: '',
        user: '',
        password: '',
        database: ''
      }
    },
    'federation' : {
      'naver' : {
        'client_id' : '5wMIL4HmBGVrvhTOEiMG',
        'secret_id' : 'AS40j308hv',
        'callback_url' : '/auth/login/naver/callback'
      },
      'facebook' : {
        'client_id' : '399589701192807',
        'secret_id' : 'd42f866bb7c527371064bcc24be05668',
        'callback_url' : '/auth/login/facebook/callback'
      }
    }
  };

