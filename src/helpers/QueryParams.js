import Cookies from 'js-cookie'

const get_access_token = (hash) => {
    const query_params_array = hash.substr(1).split('&');
    const access_token = query_params_array[0].split('=')[1];
    const inOneHour = 1/24
    Cookies.set('access_token', access_token, { expires: inOneHour})
  }

export { get_access_token }