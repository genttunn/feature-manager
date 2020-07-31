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
  static async editAlbum(id, name, desc) {
    try {
      let response = await fetch(url + "albums/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async newAlbum(name, desc) {
    try {
      let response = await fetch(url + "albums", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async deleteAlbum(id) {
    try {
      let response = await fetch(url + "albums/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getAllPatients() {
    try {
      let response = await fetch(url + "patients", {
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
  static async editPatient(
    id,
    first_name,
    last_name,
    birthdate,
    gender,
    plc_status
  ) {
    console.log("hey");
    try {
      let response = await fetch(url + "patients/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          birthdate: birthdate,
          gender: gender,
          plc_status: plc_status,
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getAllModalities() {
    try {
      let response = await fetch(url + "modalities", {
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
     static async editModality(id, name, desc) {
    try {
      let response = await fetch(url + "modalities/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async getAllRegions() {
    try {
      let response = await fetch(url + "regions", {
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
   static async editRegion(id, name, desc) {
    try {
      let response = await fetch(url + "regions/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
        }),
      });
      return await response.json();
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
  static async deleteQIB(id) {
    try {
      let response = await fetch(url + "qib/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      let res = await response.json();
      console.log(res);
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  static async editQIB(id, name, desc) {
    try {
      let response = await fetch(url + "qib/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: desc,
        }),
      });
      return await response.json();
    } catch (e) {
      console.error(e);
    }
  }
  static async editOutcome(id, column) {
    try {
      let response = await fetch(url + "qib/tag/outcome/" + id, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          outcome_column: column,
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
      let response = await fetch(url + "qib_features/" + id, {
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
