const url = "http://localhost:5000/";
export class requests {
  static async getAllAlbums() {
    try {
      let response = await fetch(url + "albums", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  static async getAllQIBs() {
    try {
      let response = await fetch(url + "qibs", {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getQIBByAlbum(id) {
    try {
      let response = await fetch(url + "qibs?album=" + id, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getQIBByDate(date) {
    try {
      let response = await fetch(url + "qibs?date=" + date, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getQIBFeatureByQIB(id) {
    try {
      let response = await fetch(url + "qib_features/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
}

export default requests;
