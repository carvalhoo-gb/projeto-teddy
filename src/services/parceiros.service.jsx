import http from "../http-common";

const url = "https://644060ba792fe886a88de1b9.mockapi.io/v1/test/partners";

class ParceirosService {
  getParceiros() {
    return Promise.resolve(http.get(url));
  }

  getParceiroById(id) {
    return Promise.resolve(http.get(`${url}/${id}`));
  }

  postParceiro(data) {
    return Promise.resolve(http.post(`${url}`, data));
  }

  putParceiro(id, data) {
    return Promise.resolve(http.put(`${url}/${id}`, data));
  }

  deleteParceiroById(id) {
    return Promise.resolve(http.delete(`${url}/${id}`));
  }
}

export default new ParceirosService();