// parceiros.service.jsx

import http from "../http-common";

class ParceirosService {
  getParceiroById(id) {
    return http.get(`https://viacep.com.br/ws/${id}/json/`);
  }
}

export default new ParceirosService();
