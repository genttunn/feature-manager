const url = "http://localhost:5000/";
export class requests {
  static async getAllAlbums() {
    try {
      let response = await fetch(url + "albums", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  static async getFeaturesOfQIB(qib_id) {
    try {
      let response = await fetch(url + "features/" + qib_id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      let data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
    }
  }
  static async getScatterplotDataByQIB(qib_id, feature_1_id, feature_2_id) {
    try {
      let response = await fetch(
        url +
          "chart/scatterplot/" +
          qib_id +
          "/" +
          feature_1_id +
          "/" +
          feature_2_id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
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
          Accept: "application/json",
        },
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
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getQIBByRegion(id) {
    try {
      let response = await fetch(url + "qibs?region=" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async editQIB(id, name, desc) {
    try {
      let response = await fetch(url + "qib_features/qib/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
 static async editOutcome(id, column) {
    try {
      let response = await fetch(url + "qib_features/qib/tag/outcome/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outcome_column: column
        }),
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
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getQIBFeatureByQIB(id) {
    try {
      let response = await fetch(url + "qib_features/qib/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getStudyByAlbum(album_id) {
    try {
      let response = await fetch(url + "studies/" + album_id, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async generateCSV(qib_id, features) {
    try {
      let response = await fetch(url + "generate_csv/" + qib_id, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          features: features,
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  static async uploadCSV(data) {
    console.log(data);
    try {
      let response = await fetch(url + "upload_csv", {
        method: "POST",
        body: data,
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }

  static async getStatistics() {
    try {
      let response = await fetch(url + "statistics/", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
}

export default requests;
